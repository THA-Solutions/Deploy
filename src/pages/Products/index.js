import styles from "@/styles/Products.module.css";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useSession, getSession } from "next-auth/react";
import { BsFillCartPlusFill } from "react-icons/bs";
import { useContext, useState, useEffect } from "react";

import CarouselComponent from "../../components/Carousel";
import UInumber from "@/UI/UInumber";
import Filters from "@/components/Filters";
import PopUp from "@/components/PopUp";

import { SearchContext } from "@/context/SearchContext";
import { FilterContext } from "@/context/FilterContext";

export default function Products() {
  const { data: session } = useSession();
  const { dadosFiltrados } = useContext(FilterContext);
  const { search } = useContext(SearchContext);
  const [produtosNoBancoDeDados, setProdutosNoBancoDeDados] = useState([]);
  const [shoppingCart, setShoppingCart] = useState([]);
  const [addCartPopUp, setAddCartPopUp] = useState(false);
  const [loginPopUp, setLoginPopUp] = useState(false);

  function subCaract(texto) {
    const caracteresEspeciais = /[!@#$%&*()+=[\]{}|\\/<>,.?:;]/g;
    return texto.replace(caracteresEspeciais, "-");
  }

  useEffect(() => {
    const value = localStorage.getItem("value");

    async function fetchData() {
      try {
        const response = await axios.get("/api/product/getProductList", {
          params: { divisao: value },
        });

        const listaProdutosTratada = response.data.map((product) => {
          return {
            id: product.id_produto,
            titulo: product.titulo,
            preco: product.preco,
            marca: product.marca,
            modelo: product.modelo,
            categoria: product.categoria,
            potencia_modulo: product.potencia_modulo,
            potencia_saida: product.potencia_saida,
            quantidade_mppt: product.quantidade_mppt,
            tensao_saida: product.tensao_saida,
          };
        });

        setProdutosNoBancoDeDados(listaProdutosTratada);
      } catch (error) {
        console.error("Erro ao carregar a pagina de produtos", error);
      }
    }
    fetchData();
  }, []);

  const handleAddToCart = async (id) => {
    if (session) {
      const produto = await axios
        .get(`/api/product/getProductByID`, {
          params: {
            id: id,
          },
        })
        .then((response) => response.data);
      const alreadyInCart = shoppingCart.find((item) => item.id === id);
      if (alreadyInCart) {
        const newShoppingCart = shoppingCart.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              quantidade: item.quantidade + 1,
              total: item.preco * (item.quantidade + 1),
            };
          }
          return item;
        });
        setShoppingCart(() => newShoppingCart);
        await addCartItem(newShoppingCart);
      } else {
        const newCartItem = [
          {
            titulo: produto.titulo_produto,
            id: produto.id_produto,
            preco: produto.preco,
            quantidade: 1,
            total: produto.preco,
          },
        ];
        setShoppingCart(() => newCartItem);
        await addCartItem(newCartItem);
      }
    }
  };

  async function addCartItem(item) {
    const addCartItem = await axios.post(
      "http://fgldistribuidora.com.br/api/cart/addItem",
      {
        shoppingCart: item,
        email: session.user.email,
      }
    );
    return addCartItem.data;
  }

  let array =
    dadosFiltrados.length === 0 ? produtosNoBancoDeDados : dadosFiltrados;
  const produtosFiltradosPelaSearchBar = array.filter((product) =>
    product.titulo.toLocaleLowerCase().includes(search.toLowerCase())
  );
  const [produtos, setProdutos] = useState([]);
  useEffect(() => {
    setProdutos(produtosFiltradosPelaSearchBar);
  }, [produtosFiltradosPelaSearchBar.length]);
  useEffect(() => {
    setTimeout(() => {
      setAddCartPopUp(false);
    }, 3500);
  }, [addCartPopUp]);

  return (
    <>
      <div className={styles.container_carousel}>
        <CarouselComponent />
      </div>
      <div className={styles.article}>
        <div className={styles.container_filters}>
          <Filters data={produtosNoBancoDeDados} />
        </div>
        <section className={styles.container}>
          <h2 className={styles.title}>PRODUTOS</h2>
          <div className={styles.shop_content}>
            {/* lista de produtos */}
            {produtos.length === 0 && (
              <div className={styles.no_products}>
                <h2>Nenhum produto encontrado</h2>
              </div>
            )}
            {produtos.map((product) => (
              <div className={styles.product_box} key={product.id}>
                <Link className={styles.link_product} href={`/${product.id}`}>
                  <Image
                    width={220}
                    height={300}
                    src={`/${product.marca.toLowerCase()}/${subCaract(
                      product.modelo
                    )}.png`}
                    alt=""
                    className={styles.product_img + " " + styles.img}
                  />
                  <h3 className={styles.product_brand}>{product.marca}</h3>
                  <h2 className={styles.product_title}>{product.titulo}</h2>
                </Link>

                <UInumber classNameProp={styles.price}>
                  {product.preco}
                </UInumber>

                <i
                  className={styles.add_cart}
                  onClick={() => {
                    handleAddToCart(product.id);
                    setAddCartPopUp(true);
                    setLoginPopUp(true);
                  }}
                >
                  <BsFillCartPlusFill />
                </i>
              </div>
            ))}
          </div>
        </section>
      </div>
      {session ? (
        <PopUp trigger={addCartPopUp} buttonVisible={false}>
          <h3>
            Produto adicionado ao carrinho <BsFillCartPlusFill />
          </h3>
        </PopUp>
      ) : (
        <PopUp
          trigger={loginPopUp}
          setTrigger={setLoginPopUp}
          buttonVisible={true}
          buttonText={"OK"}
        >
          <h3>Faça LOGIN para adicionar produtos ao carrinho</h3>
        </PopUp>
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}

import styles from "../styles/ProductDetails.module.css";
import axios from "axios";

import UInumber from "@/UI/UInumber";
import Image from "next/image";

import { getSession } from "next-auth/react";
import { useState } from "react";

export default function ProductDetails(props) {
  const [imgSelecionada, setimgSelecionada] = useState(0);
  const [valorFrete, setValorFrete] = useState(0);
  const handleImageClick = (index) => {
    setimgSelecionada(index);
  };

  function subCaract(texto) {
    const caracteresEspeciais = /[!@#$%&*()+=[\]{}|\\/<>,.?:;]/g;
    return texto.replace(caracteresEspeciais, "-");
  }
  const images = [
     `/${props.produto.marca.toLowerCase()}/${subCaract(props.produto.modelo)}.
      png
    }`,
  ];

  const calcularFrete = async () => {
    const frete = await axios.get("fgldistribuidora.com.br/api/frete/calcularFrete",{params: {cep: cep}})
    setValorFrete(frete)
  }
  

  const handleAddToCart = async (id) => {
    const session = await getSession();
    if (session) {
      const { carts } = await axios
        .get(`fgldistribuidora.com.br/api/cart/getCart`, {
          params: { email: session.user.email },
        })
        .then((res) => {
          return res.data;
        });

      const alreadyInCart = carts.find((item) => item.id_produto === id);

      if (alreadyInCart) {
        const produto = await axios
          .get(`fgldistribuidora.com.br/api/product/getProductByID`, {
            params: {
              id: id,
            },
          })
          .then((response) => response.data);
        const newCartItem = [
          {
            titulo: produto.titulo_produto,
            id: produto.id_produto,
            preco: produto.preco,
            quantidade: 1,
            total: produto.preco,
          },
        ];
        await addCartItem(newCartItem);
        return;
      } else {
        const produto = await axios
          .get(`fgldistribuidora.com.br/api/product/getProductByID`, {
            params: {
              id: id,
            },
          })
          .then((response) => response.data);

        const newCartItem = [
          {
            titulo: produto.titulo_produto,
            id: produto.id_produto,
            preco: produto.preco,
            quantidade: 1,
            total: produto.preco,
          },
        ];
        await addCartItem(newCartItem);
      }
    }
  };

  async function addCartItem(item) {
    const session = await getSession();
    const addCartItem = await axios.post("fgldistribuidora.com.br/api/cart/addItem", {
      shoppingCart: item,
      email: session.user.email,
    });
    return addCartItem.data;
  }



  return (
    <>
      <section className={styles.section}>
        <div className={styles.image_container}>
          <div className={styles.outFocus_product_images}>
            {images.map((image, index) => (
              <div
                key={index}
                className={`${imgSelecionada === index ? styles.selected : ""}`}
                onClick={() => handleImageClick(index)}
              >
                <Image
                  src={image}
                  alt={`thumbnail ${index}`}
                  width={80}
                  height={10}
                />
              </div>
            ))}
          </div>
          <div className={styles.selected_image}>
            <Image
              src={images[imgSelecionada]}
              alt="selected"
              width={400}
              height={500}
            />
          </div>
        </div>

        <div className={styles.product_description_container}>
          <h1>DESCRIÇÃO</h1>
          <hr />
          <h4>Modelo: {props.produto.modelo}</h4>
          <p>{props.produto.descricao}</p>
        </div>

        <div className={styles.checkout_container}>
          <div className={styles.product_title}>
            <h1>{props.produto.titulo}</h1>
          </div>
          <div className={styles.product_price}>
            <h2>
              <UInumber classNameProp={styles.price}>
                {props.produto.preco}
              </UInumber>
            </h2>
            <h3>
              (Em até 10x de <UInumber>{props.produto.preco / 10}</UInumber>)
            </h3>
          </div>
          <div className={styles.calculate_freight}>
            <h2>Calcule o frete</h2>
            <form action="">
              <input type="text" placeholder="Informe seu CEP" name="search" />
              <button onClick={()=>{calcularFrete()}}>Calcular</button>
            </form>
          </div>
          {props.produto.quantidade > 0 ? (
            <h2>Estoque disponível</h2>
          ) : (
            <h2>Estoque indisponível</h2>
          )}
          <div className={styles.checkout_buttons}>
            <button className={styles.buy}>Comprar</button>
            <button
              className={styles.add_cart}
              onClick={() => {
                handleAddToCart(props.produto.id);
              }}
            >
              Adicionar ao carrinho
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

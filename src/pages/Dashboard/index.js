import { getSession, signOut, useSession } from "next-auth/react";

import { useEffect, useState } from "react";
import axios from "axios";
import styles from "@/styles/Catalog.module.css";
import UInumber from "@/UI/UInumber";
import Image from "next/image";
import { useRouter } from "next/router";
import { SiAzurefunctions } from "react-icons/si";
import { MdOutlineLocalBar }  from "react-icons/md";

export default function Catalog(){
    const { data: session } = useSession();
    const [itemCart, setItemCart] = useState([]);
    const [divisao, setDivisao] = useState("Solar");
    const router = useRouter();

    const [currentPage,setCurrentPage]=useState(0)//Pagina atual
    const limit=5//Quantidade de comentarios por pagina
    const Max_Items=5 //Quantidade de botoes de paginacao
    const Max_Left=(Max_Items-1)/2//Quantidade de botoes de paginacao a esquerda
    const pages = Math.ceil(itemCart.length/limit)//Quantidade de paginas
    const startIndex=currentPage*limit//Indice inicial
    const currentData=itemCart.slice(startIndex,startIndex+limit)//Dados da pagina atual
    const first = Math.max(currentPage-Max_Left,1)


    useEffect(() => {
        if (session?.user?.permissions !== "admin") {
            router.push("/Products");
        }
    }, [session]);

    useEffect(()=>{
        async function getProducts(){
        const produtos = await axios.get(
          `${process.env.BASE_URL}/api/product/getProductList`,
          {
            params: { divisao: divisao },
          }
        );
          setItemCart(produtos.data)
        }
        setCurrentPage(0)
        getProducts()
    },[session,divisao])

    return (
      <>
        <section className={styles.container + " " + styles.forms}>
          <div className={styles.form + " " + styles.catalog}>
            <div className={styles.top}>
              <div className={styles.top_cat}>
                <p>Catálogo de Produtos</p>
              </div>

              <div className={styles.top_add}>
                <button className={styles.btn_add}>
                  <a
                    onClick={() => {
                      router.push(`/Dashboard/addProduct`);
                    }}
                  >
                    Adicionar Produto
                  </a>
                </button>
              </div>
            </div>
            <div className={styles.form_content_product}>
              <div className={styles.categories}>
                <div className={styles.cat_title}>
                  <p>- Categorias -</p>
                </div>
                <div className={styles.cat_options}>
                  <div>
                    <SiAzurefunctions
                      className={styles.icon_solar}
                      value="Solar"
                      onClick={() => {
                        setDivisao("Solar");
                      }}
                    />
                  </div>
                  <div>
                    <MdOutlineLocalBar
                      className={styles.icon_bebidas}
                      value="Bebidas"
                      onClick={() => {
                        setDivisao("Bebidas");
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.product}>
                <div className={styles.colums}>
                  <div className={styles.colum1}>
                    <p>Imagem</p>
                  </div>
                  <div className={styles.colum2}>
                    <p>Titulo</p>
                  </div>
                  <div className={styles.colum3}>
                    <p>Preço</p>
                  </div>
                  <div className={styles.colum4}>
                    <p>Ações</p>
                  </div>
                </div>
                {currentData.map((item, index) => (
                  <div className={styles.product_content} key={index}>
                    <div className={styles.product_image}>
                      <Image
                        width={100}
                        height={100}
                        src={item.img_url}
                        alt=""
                        className={styles.product_img}
                      />
                    </div>
                    <div className={styles.product_title}>
                      <h3>{item.titulo}</h3>
                    </div>
                    <div className={styles.product_price}>
                      <UInumber>{item.preco}</UInumber>
                    </div>
                    <div className={styles.button}>
                      <button onClick={() => {}} className={styles.btn_remove}>
                        Remover
                      </button>

                      <button onClick={() => {}} className={styles.btn_desact}>
                        Desativar
                      </button>

                      <button
                        className={styles.btn_edit}
                        onClick={(e) => {
                          router.push(`/Dashboard/${item.id_produto}`);
                        }}
                      >
                        Editar
                      </button>
                    </div>
                  </div>
                ))}
                <div className={styles.navigation}>
                  {Array.from({ length: Math.min(Max_Items, pages) })
                    .map((_, index) => index + first)
                    .map((page) =>
                      page <= pages - 1 ? (
                        <button
                          value={page}
                          onClick={(e) => {
                            setCurrentPage(Number(e.target.value));
                          }}
                        >
                          {page}
                        </button>
                      ) : null
                    )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
}
import { getSession, signOut, useSession } from "next-auth/react";
import { BASE_URL } from "@/constants/constants";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "@/styles/Checkout.module.css";
import UInumber from "@/UI/UInumber";
import Image from "next/image";
import { useRouter } from "next/router";


export default function Catalog(){
    const { data: session } = useSession();
    const [itemCart, setItemCart] = useState([]);
    const [divisao, setDivisao] = useState("Solar");
    const router = useRouter();

    useEffect(() => {
        if (session?.user?.permissions !== "admin") {
            router.push("/Products");
        }
    }, [session]);

    useEffect(()=>{
        async function getProducts(){
        const produtos=await axios.get(`${BASE_URL}/api/product/getProductList`, {
            params: { divisao: divisao },
          });
          setItemCart(produtos.data)
        }
        getProducts()
    },[session,divisao])

    return(
        console.log(itemCart),
    <>
            <section className={styles.container + " " + styles.forms}>
      <div className={styles.form + " " + styles.login}>
        <div className={styles.form_content_product}>
        <div className={"styles.division"}>
          <p>Divisao : </p>
          <select
            id="divisao"
            name="divisao"
            value={divisao}
            onChange={(e) => setDivisao(e.target.value)}
            type="divisao"
          >
            <option value="Solar">Solar</option>
            <option value="Bebidas">Bebidas</option>
          </select>
        </div>
          <header>Confirme seus produtos</header>
          {itemCart.map((item, index) => (
            <div className={styles.product_content} key={index}>
              <Image
                width={100}
                height={100}
                src={item.img_url}
                /*{item.img}*/
                alt=""
                className={styles.product_img}
              />
              <div>
              <button>
                Remover
              </button>

              <button>
                Editar
              </button>
              </div>
              <h3>{item.titulo_produto}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
    </>)
}
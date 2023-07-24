import axios from "axios";
import styles from "../styles/Checkout.module.css";
import Image from "next/image";
import UInumber from "@/UI/UInumber";
import { useRouter } from "next/router";
import { useState } from "react";
import PopUp from "./PopUp";
import { BsFillCartPlusFill } from "react-icons/bs";
export default function CheckoutFormProducts({
  itemCart,
  total,
  session,
  address,
  phone
}) {
  const [barrarPedido, setBarrarPedido] = useState(false);
  const [finalizarPedido, setFinalizarPedido] = useState(false);
  const router = useRouter();
  
  const sendEmail = async () => {

    const result = await axios.post(
      `${process.env.BASE_URL}/api/email/sendEmail`,
      {
        itemCart: itemCart,
        total: total,
        session: session,
        address: address,
      }
    );

    router.push("/Checkout/registeredOrder");
    await axios.post(`${process.env.BASE_URL}/api/cart/closeCart`, {
      email: session.user.email,
    });
    return result;
  };

  function subCaract(texto) {
    const caracteresEspeciais = /[!@#$%&*()+=[\]{}|\\/<>,.?:;]/g;
    return texto.replace(caracteresEspeciais, "-");
  }

  return (
    <section className={styles.container + " " + styles.forms}>
      <div className={styles.form + " " + styles.login}>
        <div className={styles.form_content_product}>
          <header>Confirme seus produtos</header>
          {itemCart.map((item, index) => (
            <div className={styles.product_content} key={index}>
              <Image
                width={100}
                height={100}
                src={item.produto.img_url}
                /*{item.img}*/
                alt=""
                className={styles.product_img}
              />
              <h3>{item.titulo_produto}</h3>
              <p>Quantidade: {item.quantidade}</p>
              <p>
                Valor: <UInumber>{item.total}</UInumber>
              </p>
            </div>
          ))}
        </div>
        <p className={styles.total_products}>
          Total da compra: <UInumber>{total}</UInumber>
        </p>
        <button className={styles.finish_button} onClick={phone && address ?
          (<PopUp trigger={finalizarPedido} buttonVisible={false}>
          <h3>
            Pedido encaminhado
          </h3>
        </PopUp>,
        
        () => sendEmail())
          :(<PopUp
          trigger={barrarPedido}
          setTrigger={setBarrarPedido}
          buttonVisible={true}
          buttonText={"OK"}
        >
          <h3>Todas as informacoes devem estar preenchidas para concluir o pedido</h3>
        </PopUp>)}>
          FINALIZAR COMPRA
        </button>
      </div>
    </section>
  );
}

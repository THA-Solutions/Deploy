import axios from "axios";
import styles from "../styles/Checkout.module.css";

import Image from "next/image";
import UInumber from "@/UI/UInumber";

import { useRouter } from "next/router";

export default function CheckoutFormProducts({
  itemCart,
  total,
  session,
  address,
}) {
  const router = useRouter();
  const sendEmail = async () => {
    const result = await axios.post(`/api/email/sendEmail`, {
      itemCart: itemCart,
      total: total,
      session: session,
      address: address,
    });
    router.push("/Checkout/registeredOrder");
    await axios.post(`/api/cart/closeCart`, {
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
                src={`/${item.produto.marca_produto}/${subCaract(
                  item.produto.modelo
                )}.${"png" || "jpg" || "jpeg" || "gif" || "svg" || "webp"}`}
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
        <button className={styles.finish_button} onClick={() => sendEmail()}>
          FINALIZAR COMPRA
        </button>
      </div>
    </section>
  );
}

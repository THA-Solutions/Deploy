import styles from "../../styles/RegisteredOrder.module.css";

export default function registeredOrder() {
  return (
    <div className={styles.container}>
      <div className={styles.message}>
        <h1>Seu pedido foi cadastro!</h1>
        <h2>Por favor aguarde contato vendedor</h2>
      </div>
    </div>
  );
}

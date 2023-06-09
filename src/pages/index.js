import { useRouter } from "next/router";
import styles from "../styles/Index.module.css";
import Image from "next/image";
import solar from "../../public/painel.jpg";
import energetico from "../../public/energetico_logo.jpg";

export default function Home() {
  const router = useRouter();

  function setValueHandler(value) {
    localStorage.setItem("value", value);
    sessionStorage.setItem("value", value);

    router.push("/Products");
  }

  return (
    <div className={styles.container}>
      <h1>Selecione uma categoria</h1>
      <div className={styles.categories}>
        <div className={styles.item}>
          <button
            onClick={() => {
              setValueHandler("Bebidas");
            }}
          >
            <Image
              src={energetico}
              alt="imagem_bebidas"
              width={200}
              height={230}
            />
            <p>Bebidas</p>
          </button>
        </div>

        <div className={styles.item}>
          <button
            onClick={() => {
              setValueHandler("Solar");
            }}
          >
            <Image src={solar} alt="imagem_solar" width={200} height={230} />

            <p>Solar</p>
          </button>
        </div>
      </div>
    </div>
  );
}

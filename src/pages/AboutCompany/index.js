import styles from "../../styles/AboutCompany.module.css";
import banner from "../../../public/QuemSomos_Banner.png";
import FGL from "../../../public/FGL_Alternativa_Colorida.png";
import Image from "next/image";

export default function AboutCompany() {
  return (
    <div className={styles.container}>
      <header>Sobre a FGL Distribuidora</header>

      <div className={styles.article}>
        <h3>Quem somos?</h3>
        <p>
          A FGL Distribuidora, situada em Maringá-PR, tem como foco garantir a
          satisfação de seus clientes, fornecendo produtos, soluções de
          qualidade, bom preço e o mais importante: a agilidade que o integrador
          de Energias Renováveis precisa.
        </p>
        <h3>O que nós oferecemos?</h3>
        <Image
          className={styles.banner}
          width={750}
          height={750}
          src={banner}
          alt="banner"
        />

        <div className={styles.footerAbout}>
          <Image
            className={styles.logo}
            width={400}
            height={120}
            src={FGL}
            alt="logoFGL"
          />
          <div className={styles.companyInfo}>
            <p>Razão Social: </p>
            <p>CNPJ: </p>
            <p>E-mail: atendimento@fgldistribuidora.com</p>
            <p>Av. Melvin Jones, 1194</p>
            <p>Parque Industrial Bandeirantes Maringá - PR</p>
          </div>
        </div>
      </div>
    </div>
  );
}

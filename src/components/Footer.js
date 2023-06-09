import React from "react";
import styles from "../styles/Footer.module.css";
import Link from "next/link";

import { FaPhone, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { ImLocation } from "react-icons/im";
import { IoMail } from "react-icons/io5";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.sb_footer + " " + styles.section_padding}>
        <div className={styles.footer_links}>
          <div className={styles.footer_links_div}>
            <h4>Institucional</h4>
            <Link className={styles.footer_sub_link} href="/AboutCompany">
              <p>Sobre a FGL Distribuidora</p>
            </Link>
          </div>

          <div className={styles.footer_links_div}>
            <h4>Atendimento</h4>
            <p className={styles.atendimento}>
              <IoMail /> atendimento@fgldistribuidora.com
            </p>
            <p className={styles.atendimento}>
              <FaPhone /> (44) 9 9809-6379
            </p>
            <p className={styles.atendimento}>
              <ImLocation /> Av. Melvin Jones, 1194 - Maringá PR
            </p>
          </div>

          {/* <div className={styles.footer_links_div}>
            <h4>Políticas da Loja</h4>
            <Link className={styles.footer_sub_link} href="/formas-pagamento">
              <p>Formas de pagamento</p>
            </Link>
            <Link className={styles.footer_sub_link} href="/troca-devolucoes">
              <p>Trocas e Devoluções</p>
            </Link>
            <Link className={styles.footer_sub_link} href="/prazos-entrega">
              <p>Prazos e Entrega</p>
            </Link>
          </div> */}

          <div className={styles.footer_links_div}>
            <h4>Redes Sociais</h4>
            <div className={styles.social_media}>
              <Link className={styles.footer_sub_link} href="/Products">
                <p>
                  <FaFacebook />
                </p>
              </Link>
              <Link
                className={styles.footer_sub_link}
                href="https://www.instagram.com/fgldistribuidora.mga/"
                target="_blank"
              >
                <p>
                  <FaInstagram />
                </p>
              </Link>
              <Link className={styles.footer_sub_link} href="/Products">
                <p>
                  <FaLinkedin />
                </p>
              </Link>
            </div>
          </div>
        </div>
        <hr className={styles.hr} />
        <div className={styles.footer_below}>
          <div className={styles.footer_copyright}>
            <p>
              @{new Date().getFullYear()} FGL Distribuidora. All right reserved.
            </p>
          </div>
          <div className={styles.footer_below_links}>
            <Link className={styles.footer_sub_link} href="/termos">
              <p>Termos & Condições</p>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

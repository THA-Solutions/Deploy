import React, { useContext, useState } from "react";
import SearchBar from "./SearchBar";
import SearchMenu from "./SearchBarMenu";
import styles from "../styles/Navbar.module.css";
import Image from "next/image";
import Link from "next/link";
import fgl from "../../public/fgl_logo.png";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import { BsCartFill, BsFillPersonFill } from "react-icons/bs";
import { signIn, useSession } from "next-auth/react";
import { FilterContext } from "@/context/FilterContext";

export default function Navbar() {
  const { data: session } = useSession();
  const [toggleMenu, setToggleMenu] = useState(false);
  const { handleOnCheckbox} = useContext(FilterContext);
  return (
    <>
      <div className={styles.navbar}>
        <Link href="/Products">
          <Image
            priority={true}
            className={styles.navbar_img}
            src={fgl}
            alt="Logo FGL Distribuidora"
          />
        </Link>
        <SearchBar />
        <div className={styles.navbar_button}>
          <Link className={styles.link} href="/Cart">
            <button>
              CARRINHO <BsCartFill />
            </button>
          </Link>
          {!session ? (
            // <Link className={styles.link} href="/Login">
            //   <button>
            //     LOGIN <BsFillPersonFill />
            //   </button>
            // </Link>
            <button onClick={() => signIn()}>
              LOGIN <BsFillPersonFill />
            </button>
          ) : (
            <Link className={styles.link} href="/Perfil">
              <button>
                PERFIL <BsFillPersonFill />
              </button>
            </Link>
          )}
        </div>
        <div className={styles.navbar_menu}>
          {toggleMenu ? (
            <RiCloseLine
              color="#000"
              size={27}
              onClick={() => setToggleMenu(false)}
            />
          ) : (
            <RiMenu3Line
              color="#000"
              size={27}
              onClick={() => setToggleMenu(true)}
            />
          )}
          {toggleMenu && (
            <div className={styles.navbar_menu_container}>
              <div className={styles.navbar_menu_items}>
                <Link className={styles.link_menu} href="/">
                  Lista de produtos
                </Link>
                <SearchMenu />
                <Link className={styles.button_menu} href="/Cart">
                  <button>
                    CARRINHO <BsCartFill />
                  </button>
                </Link>
                <Link className={styles.button_menu} href="/Login">
                  <button>
                    LOGIN <BsFillPersonFill />
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={styles.category_container}>
        <Link href="/">Lista de Produtos</Link>
      </div>
    </>
  );
}

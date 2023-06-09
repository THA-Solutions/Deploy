/* eslint-disable react/jsx-key */
import React from "react";
import styles from "../styles/ItemCart.module.css";
import { useState, useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Image from "next/image";
import UInumber from "@/UI/UInumber";

export default function ItemCart({ cart, updateQuantity, removeFromCart }) {
  const [itemCart, setItemCart] = useState([]);

  useEffect(() => {
    setItemCart(cart);
  }, [cart]);

  function subCaract(texto) {
    const caracteresEspeciais = /[!@#$%&*()+=[\]{}|\\/<>,.?:;]/g;
    return texto.replace(caracteresEspeciais, "-");
  }

  return (
    <div>
      {itemCart?.map((item) => (
        <div className={styles.product_cart}>
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
          <h2 className={styles.product_title}>{item.titulo_produto}</h2>
          <div className={styles.product_quantity}>
            <h4>Quantidade</h4>
            <div className={styles.quantity_buttons}>
              <button
                onClick={() => {
                  updateQuantity.handleQuantity(
                    "decrease",
                    item.titulo_produto
                  );
                }}
                className={styles.quantity_decrease}
              >
                <FaChevronLeft />
              </button>
              <label className={styles.quantity}>{item.quantidade}</label>
              <button
                onClick={() => {
                  updateQuantity.handleQuantity(
                    "increase",
                    item.titulo_produto
                  );
                }}
                className={styles.quantity_increase}
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
          <div className={styles.product_total}>
            <h4>Total</h4>
            <h3>
              <UInumber>{item.total}</UInumber>
            </h3>
          </div>
          <div className={styles.product_remove}>
            <button
              onClick={() => {
                removeFromCart.handleRemoveFromCart(item.id_itempedido);
              }}
            >
              <FaTrashAlt />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

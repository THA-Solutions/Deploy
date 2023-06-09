import axios from "axios";
import styles from "../../styles/Checkout.module.css";

import { getSession } from "next-auth/react";
import { useEffect, useState, useLayoutEffect } from "react";

import CheckoutFormUser from "@/components/CheckoutFormUser";
import CheckoutFormAddress from "@/components/CheckoutFormAddress";
import CheckoutFormProducts from "@/components/CheckoutFormProducts";

export default function Checkout() {
  const [session, setSession] = useState();
  const [address, setAddress] = useState([]);
  const [itemCart, setItemCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    async function getSessionUser() {
      const session = await getSession();
      setSession(session);
      return session;
    }
    getSessionUser();
  }, []);

  useEffect(() => {
    async function getAddress() {
      const session = await getSession();
      const address = await axios.get(`/api/user/checkAddress`, {
        params: { email: session.user.email },
      });
      setAddress(address.data);
      return address;
    }
    getAddress();

    async function getCartItems() {
      const session = await getSession();
      const produto = await axios.get(`/api/cart/getCart`, {
        params: { email: session.user.email },
      });
      setItemCart(produto.data.carts);
      setTotal(produto.data.total);
      return produto;
    }
    getCartItems();
  }, []);

  return (
    <div className={styles.container_checkout}>
      {/* Dados usuário */}
      <CheckoutFormUser session={session} />

      {/* Dados de entrega */}
      <CheckoutFormAddress address={address} />

      {/* Dados da compra */}
      <CheckoutFormProducts
        itemCart={itemCart}
        total={total}
        session={session}
        address={address}
      />
    </div>
  );
}

import styles from "../../styles/Perfil.module.css";
import Image from "next/image";
import axios from "axios";

import perfilImagemAlternative from "../../../public/fgl_quadrado.png";

import { getSession, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Perfil() {
  const { data: session } = useSession();
  const [address, setAddress] = useState([]);
  const [updateInfo, setUpdateInfo] = useState(true);

  useEffect(() => {
    async function getCartItems() {
      await axios.get(`/api/cart/getCart`, {
        params: { email: session.user.email },
      });
    }
    getCartItems();

    async function getAddress() {
      const address = await axios.get(`/api/user/checkAddress`, {
        params: { email: session.user.email },
      });
      setAddress(address.data);
      return address;
    }
    getAddress();
  }, [session.user.email]);

  return (
    <div className={styles.container}>
      {/* Image Container */}
      <div className={styles.image_container}>
        <div className={styles.user_info}>
          <Image
            className={styles.image}
            width={100}
            height={100}
            src={session?.user?.image || perfilImagemAlternative}
            alt="Imagem de perfil"
          />
          <div className={styles.user_nameEmail}>
            <h2>{session?.user?.name}</h2>
            <h3>{session?.user?.email}</h3>
          </div>
        </div>
        <button onClick={() => signOut()}>SAIR</button>
      </div>

      {/* Profile Container */}
      <div className={styles.profile_container}>
        <h1>Perfil</h1>
        <form className={styles.formClass}>
          <div className={styles.group_name}>
            <div className={styles.field + " " + styles.input_field}>
              <input
                className={styles.input}
                id="firstName"
                placeholder={session?.user?.name}
                type="text"
                disabled={updateInfo}
              />
            </div>
            <div className={styles.field + " " + styles.input_field}>
              <input
                className={styles.input}
                id="lastName"
                placeholder={session?.user?.lastName}
                type="text"
                disabled={updateInfo}
              />
            </div>
          </div>
          <div className={styles.field + " " + styles.input_field}>
            <input
              className={styles.input}
              id="email"
              placeholder={session?.user?.email || "Email"}
              type="text"
              disabled={updateInfo}
            />
          </div>
          <div className={styles.field + " " + styles.input_field}>
            <input
              className={styles.input}
              id="phone"
              placeholder={session?.user?.phone || "Telefone"}
              type="text"
              disabled={updateInfo}
            />
          </div>
        </form>
      </div>

      {/* Address Container */}
      <div className={styles.address_container}>
        <h1>Endereço</h1>
        <form className={styles.formClass}>
          <div className={styles.field + " " + styles.input_field}>
            <input
              className={styles.input}
              id="cep"
              placeholder={address[0]?.cep || "CEP"}
              type="text"
              disabled={updateInfo}
            />
          </div>
          <div className={styles.field + " " + styles.input_field}>
            <input
              className={styles.input}
              id="logradouro"
              placeholder={address[0]?.logradouro || "Logradouro"}
              type="text"
              disabled={updateInfo}
            />
          </div>
          <div className={styles.group_number_neighborhood}>
            <div className={styles.field + " " + styles.input_field}>
              <input
                className={styles.input}
                id="numero"
                placeholder={address[0]?.numero || "Número"}
                type="number"
                disabled={updateInfo}
              />
            </div>
            <div className={styles.field + " " + styles.input_field}>
              <input
                className={styles.input}
                id="bairro"
                placeholder={address[0]?.bairro || "Bairro"}
                type="text"
                disabled={updateInfo}
              />
            </div>
          </div>
          <div className={styles.field + " " + styles.input_field}>
            <input
              id="complemento"
              placeholder={address[0]?.complemento || "Complemento"}
              className={styles.input}
              type="text"
              disabled={updateInfo}
            />
          </div>
          <div className={styles.group_city_uf}>
            <div className={styles.field + " " + styles.input_field}>
              <input
                className={styles.input}
                id="cidade"
                placeholder={address[0]?.cidade || "Cidade"}
                type="text"
                disabled={updateInfo}
              />
            </div>

            <div className={styles.field + " " + styles.input_field}>
              <input
                className={styles.input}
                id="estado"
                placeholder={address[0]?.estado || "Estado"}
                type="text"
                disabled={updateInfo}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: "/Login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};

import styles from "../styles/Checkout.module.css";

import { useState } from "react";
import { useForm } from "react-hook-form";

export default function CheckoutFormUser({ session }) {
  const [updatePhone, setUpdatePhone] = useState(true);
  const [editPhone, setEditPhone] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmitPhone = async (body) => {
    setEditPhone(false);
    setUpdatePhone(true);
  };

  return (
    <section className={styles.container + " " + styles.forms}>
      <div className={styles.form + " " + styles.login}>
        <div className={styles.form_content}>
          <header>Confirme seus dados</header>

          <form
            onSubmit={handleSubmit(onSubmitPhone)}
            className={styles.formClass}
          >
            <div className={styles.field + " " + styles.input_field}>
              <label>Nome</label>
              <input
                className={styles.input}
                placeholder={session?.user?.name}
                type="text"
                disabled={true}
              />
            </div>
            <div className={styles.field + " " + styles.input_field}>
              <label>E-mail</label>
              <input
                className={styles.input}
                placeholder={session?.user?.email}
                type="text"
                disabled={true}
              />
            </div>
            <div className={styles.field + " " + styles.input_field}>
              <label>Telefone</label>
              <input
                className={styles.input}
                placeholder={session?.user?.phone}
                type="text"
                {...register("phone", { required: true })}
                disabled={updatePhone}
              />
            </div>
            <div className={styles.field + " " + styles.button_field}>
              {editPhone ? (
                <button type="submit" className={styles.button_submit}>
                  SALVAR
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setUpdatePhone(false);
                    setEditPhone(true);
                  }}
                >
                  EDITAR
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

import styles from "../styles/Checkout.module.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function CheckoutFormUser({ session, phone }) {
  const [updatePhone, setUpdatePhone] = useState(true);
  const [editPhone, setEditPhone] = useState(false);

  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  const onSubmitPhone = async (body) => {
    try {
      const user = {
        phone: body.phone,
        email: session?.user.email
      };

      const response = await axios.post(`/api/user/updateUser`, user);
      return response;
    } catch (error) {
      setError(error.message);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (editPhone==false) {
      handleSubmit(onSubmitPhone)();
    } else {
      setUpdatePhone(false);
      setEditPhone(true);
    }
  };

  return (
    <section className={styles.container + " " + styles.forms}>
      <div className={styles.form + " " + styles.login}>
        <div className={styles.form_content}>
          <header>Confirme seus dados</header>

          <form onSubmit={handleFormSubmit} className={styles.formClass}>
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
                placeholder={phone}
                type="text"
                {...register("phone", { required: true })}
                disabled={updatePhone}
              />
              {errors?.phone?.type === "required" && (
                <span className={styles.error_message}>
                  Insira um Numero de Telefone
                </span>
              )}
              {error && (
                <span className={styles.error_message}>{error}</span>
              )}
            </div>

            <div className={styles.field + " " + styles.button_field}>
            <button type="submit" className={styles.button_submit}
            onClick={()=>{if(editPhone){
              setUpdatePhone(true);
            }else{setUpdatePhone(false)}
     
              setEditPhone(!editPhone)
            }}>
             {editPhone? "SALVAR" : "EDITAR"}    
                </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

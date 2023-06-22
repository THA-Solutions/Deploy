import styles from "../styles/Checkout.module.css";
import { BASE_URL } from "@/constants/constants";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function CheckoutFormAddress({ session, address }) {
  const [updateInfo, setUpdateInfo] = useState(true);
  const [editAddress, setEditAddress] = useState(false);
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    setValue,
    setFocus,
    formState: { errors },
  } = useForm();

  address = [address];

  const checkCEP = (event) => {
    const cep = event.target.value.replace(/\D/g, "");
    try {
      if (cep === "") {
        return;
      }
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then((response) => response.json())
        .then((data) => {
          setValue("cep", cep);
          setValue("logradouro", data.logradouro);
          setValue("bairro", data.bairro);
          setValue("cidade", data.localidade);
          setValue("estado", data.uf);
          setFocus("numero");
        });
    } catch (error) {
      setError("CEP não encontrado.");
    }
  };

  const onSubmit = async (body) => {
    try {
      await fetch("https://fgldistribuidora.vercel.app/api/user/updateAddress", {
        method: "POST",
        body: JSON.stringify({
          userEmail: session.user.email,
          cep: body.cep.replace(/\D/g, ""),
          logradouro: body.logradouro,
          numero: body.numero,
          bairro: body.bairro,
          complemento: body.complemento,
          cidade: body.cidade,
          estado: body.estado,
        }),
      });
      console.log(response);
      return;
    } catch (error) {
      console.error("Erro na atualização do endereço: ", error);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(errors).length > 0) {

      console.log("deu erro em");
      setUpdateInfo(false);
      setEditAddress(true);
      return;
    }else{
      handleSubmit(onSubmit)();
    }
    
  };

  const handleEditClick = () => {
    if (Object.keys(errors).length > 0) {
      setUpdateInfo(false);
      setEditAddress(true);
    } else {
      setUpdateInfo(!updateInfo);
      setEditAddress(!editAddress);
    }
  };

  return (
    <section className={`${styles.container} ${styles.forms}`}>
      <div className={`${styles.form} ${styles.login}`}>
        <div className={styles.form_content}>
          <header>Confirme seu endereço</header>

          <form onSubmit={handleFormSubmit} className={styles.formClass}>
            <div className={`${styles.field} ${styles.input_field}`}>
              <input
                className={styles.input}
                id="cep"
                placeholder={address[0]?.cep || "CEP"}
                type="text"
                {...register("cep", { required: true })}
                onBlur={checkCEP}
                disabled={updateInfo}
              />
              {errors?.cep?.type === "required" && !updateInfo && (
                <span className={styles.error_message}>
                  O CEP é obrigatório.
                </span>
              )}
              {error && <span>{error}</span>}
            </div>
            <div className={`${styles.field} ${styles.input_field}`}>
              <input
                className={styles.input}
                id="logradouro"
                placeholder={address[0]?.logradouro || "Logradouro"}
                type="text"
                {...register("logradouro", { required: true })}
                disabled={updateInfo}
              />
              {errors?.logradouro?.type === "required" && !updateInfo && (
                <span className={styles.error_message}>
                  O logradouro é obrigatório.
                </span>
              )}
            </div>
            <div className={styles.group_number_neighborhood}>
              <div className={`${styles.field} ${styles.input_field}`}>
                <input
                  className={styles.input}
                  id="numero"
                  placeholder={address[0]?.numero || "Número"}
                  type="number"
                  {...register("numero", { required: true })}
                  disabled={updateInfo}
                />
                {errors?.numero?.type === "required" && !updateInfo && (
                  <span className={styles.error_message}>
                    O número é obrigatório.
                  </span>
                )}
              </div>
              <div className={`${styles.field} ${styles.input_field}`}>
                <input
                  className={styles.input}
                  id="bairro"
                  placeholder={address[0]?.bairro || "Bairro"}
                  type="text"
                  {...register("bairro", { required: true })}
                  disabled={updateInfo}
                />
                {errors?.bairro?.type === "required" && !updateInfo && (
                  <span className={styles.error_message}>
                    O bairro é obrigatório.
                  </span>
                )}
              </div>
            </div>
            <div className={`${styles.field} ${styles.input_field}`}>
              <input
                id="complemento"
                placeholder={address[0]?.complemento || "Complemento"}
                className={styles.input}
                type="text"
                {...register("complemento")}
                disabled={updateInfo}
              />
            </div>
            <div className={styles.group_city_uf}>
              <div className={`${styles.field} ${styles.input_field}`}>
                <input
                  className={styles.input}
                  id="cidade"
                  placeholder={address[0]?.cidade || "Cidade"}
                  type="text"
                  {...register("cidade", { required: true })}
                  disabled={updateInfo}
                />
                {errors?.cidade?.type === "required" && !updateInfo && (
                  <span className={styles.error_message}>
                    A cidade é obrigatória.
                  </span>
                )}
              </div>

              <div className={`${styles.field} ${styles.input_field}`}>
                <input
                  className={styles.input}
                  id="estado"
                  placeholder={address[0]?.estado || "Estado"}
                  type="text"
                  {...register("estado", { required: true })}
                  disabled={updateInfo}
                />
                {errors?.estado?.type === "required" && !updateInfo && (
                  <span className={styles.error_message}>
                    O estado é obrigatório.
                  </span>
                )}
              </div>
            </div>
            <div className={`${styles.field} ${styles.button_field}`}>
              <button className={styles.button_submit} onClick={handleEditClick}>
                {editAddress ? "SALVAR" : "EDITAR"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
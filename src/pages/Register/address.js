import styles from "../../styles/Login.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function RegisterAdress() {
  const { data: session } = useSession();
  const [error, setError] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    setFocus,
    formState: { errors },
  } = useForm();

  const onSubmit = async (body) => {
    try {
      const address = await fetch("/api/user/registerAddress", {
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
      router.push("/Checkout");
    } catch (error) {
      console.error("Erro no cadastro do usuario: ", error);
    }
  };

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

  return (
    <section className={styles.container + " " + styles.forms}>
      <div className={styles.form + " " + styles.login}>
        <div className={styles.form_content}>
          <header>Cadastre seu endereço</header>

          <form onSubmit={handleSubmit(onSubmit)} className={styles.formClass}>
            <div className={styles.field + " " + styles.input_field}>
              <input
                className={
                  errors?.cep && styles.input_error + " " + styles.input
                }
                id="cep"
                placeholder="CEP"
                type="text"
                {...register("cep", { required: true })}
                onBlur={checkCEP}
              />
              {errors?.cep?.type === "required" && (
                <span className={styles.error_message}>
                  O CEP é obrigatório.
                </span>
              )}
              {error && <span>{error}</span>}
            </div>

            <div className={styles.field + " " + styles.input_field}>
              <input
                className={
                  errors?.logradouro && styles.input_error + " " + styles.input
                }
                id="logradouro"
                placeholder="Logradouro"
                type="text"
                {...register("logradouro", { required: true })}
              />
              {errors?.logradouro?.type === "required" && (
                <span className={styles.error_message}>
                  O logradouro é obrigatório.
                </span>
              )}
            </div>

            <div className={styles.group_number_neighborhood}>
              <div className={styles.field + " " + styles.input_field}>
                <input
                  className={
                    errors?.numero && styles.input_error + " " + styles.input
                  }
                  id="numero"
                  placeholder="Número"
                  type="number"
                  {...register("numero", { required: true })}
                />
                {errors?.numero?.type === "required" && (
                  <span className={styles.error_message}>
                    O número é obrigatório.
                  </span>
                )}
              </div>

              <div className={styles.field + " " + styles.input_field}>
                <input
                  className={
                    errors?.bairro && styles.input_error + " " + styles.input
                  }
                  id="bairro"
                  placeholder="Bairro"
                  type="text"
                  {...register("bairro", { required: true })}
                />
                {errors?.bairro?.type === "required" && (
                  <span className={styles.error_message}>
                    O bairro é obrigatório.
                  </span>
                )}
              </div>
            </div>

            <div className={styles.field + " " + styles.input_field}>
              <input
                id="complemento"
                placeholder="Complemento"
                className={styles.input}
                type="text"
                {...register("complemento")}
              />
            </div>

            <div className={styles.group_city_uf}>
              <div className={styles.field + " " + styles.input_field}>
                <input
                  className={
                    errors?.cidade && styles.input_error + " " + styles.input
                  }
                  id="cidade"
                  placeholder="Cidade"
                  type="text"
                  {...register("cidade", { required: true })}
                />
                {errors?.cidade?.type === "required" && (
                  <span className={styles.error_message}>
                    A cidade é obrigatória.
                  </span>
                )}
              </div>

              <div className={styles.field + " " + styles.input_field}>
                <input
                  className={
                    errors?.estado && styles.input_error + " " + styles.input
                  }
                  id="estado"
                  placeholder="Estado"
                  type="text"
                  {...register("estado", { required: true })}
                />
                {errors?.estado?.type === "required" && (
                  <span className={styles.error_message}>
                    O estado é obrigatório.
                  </span>
                )}
              </div>
            </div>

            <div className={styles.field + " " + styles.button_field}>
              <button type="submit">CADASTRAR</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

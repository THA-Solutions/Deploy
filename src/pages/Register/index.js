import styles from "../../styles/Login.module.css";
import Link from "next/link";
import validator from "validator";
import bcrypt from "bcryptjs";

import PopUp from "@/components/PopUp";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/router";
import { setCookie } from "cookies-next";

export default function Register() {
  const [error, setError] = useState("");
  const [showPopUp, setShowPopUp] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = async (body) => {
    try {
      const user = {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phone: body.phone,
        password: bcrypt.hashSync(body.password, 10),
      };

      setShowPopUp(true);

      const response = await fetch("/api/user/register", {
        method: "POST",
        body: JSON.stringify(user),
      });

      // const json = await response.json();
      // if (response.status !== 200) throw new Error(json);
      // setCookie("authorization", json);

      router.push("/Login");
    } catch (error) {
      console.error("Erro no cadastro: ", error);
      setError(error.message);
    }
  };

  //const watchPassword = watch("password");

  return (
    <section className={styles.container + " " + styles.forms}>
      <div className={styles.form + " " + styles.login}>
        <div className={styles.form_content}>
          <header>Faça seu Cadastro</header>

          <form onSubmit={handleSubmit(onSubmit)} className={styles.formClass}>
            <div className={styles.group_name}>
              <div className={styles.field + " " + styles.input_field}>
                <input
                  className={
                    errors?.firstName && styles.input_error + " " + styles.input
                  }
                  id="firstName"
                  placeholder="Primeiro nome"
                  type="text"
                  {...register("firstName", { required: true })}
                />
                {errors?.firstName?.type === "required" && (
                  <span className={styles.error_message}>
                    O primeiro nome é obrigatório.
                  </span>
                )}
              </div>

              <div className={styles.field + " " + styles.input_field}>
                <input
                  className={
                    errors?.lastName && styles.input_error + " " + styles.input
                  }
                  id="lastName"
                  placeholder="Ultimo nome"
                  type="text"
                  {...register("lastName", { required: true })}
                />
                {errors?.lastName?.type === "required" && (
                  <span className={styles.error_message}>
                    O ultimo nome é obrigatório.
                  </span>
                )}
              </div>
            </div>
            <div className={styles.field + " " + styles.input_field}>
              <input
                className={
                  errors?.email && styles.input_error + " " + styles.input
                }
                id="email"
                placeholder="E-mail"
                type="email"
                {...register("email", {
                  required: true,
                  validate: (value) => validator.isEmail(value),
                })}
              />
              {errors?.email?.type === "required" && (
                <span className={styles.error_message}>
                  O e-mail é obrigatório.
                </span>
              )}
              {errors?.email?.type === "validate" && (
                <span className={styles.error_message}>
                  O e-mail é inválido. Formato esperado: exemplo@exemplo.com
                </span>
              )}
              {error && (
                <span className={styles.error_registered_email}>{error}</span>
              )}
            </div>

            <div className={styles.field + " " + styles.input_field}>
              <input
                className={
                  errors?.phone && styles.input_error + " " + styles.input
                }
                id="phone"
                placeholder="Telefone"
                type="number"
                {...register("phone", {
                  required: true,
                  validate: (value) => validator.isMobilePhone(value, "pt-BR"),
                })}
              />
              {errors?.phone?.type === "required" && (
                <span className={styles.error_message}>
                  O telefone é obrigatório.
                </span>
              )}
              {errors?.phone?.type === "validate" && (
                <span className={styles.error_message}>
                  O telefone é inválido. Formato esperado (99) 9999-9999
                </span>
              )}
            </div>

            <div className={styles.field + " " + styles.input_field}>
              <input
                className={
                  errors?.password && styles.input_error + " " + styles.input
                }
                id="password"
                placeholder="Senha"
                type="password"
                {...register("password", {
                  required: true,
                  minLength: 8,
                })}
              />
              {errors?.password?.type === "required" && (
                <span className={styles.error_message}>
                  A senha é obrigatória.
                </span>
              )}
              {errors?.password?.type === "minLength" && (
                <span className={styles.error_message}>
                  A senha deve ter no mínimo 8 caracteres
                </span>
              )}
            </div>

            {/* <div className={styles.field + " " + styles.input_field}>
              <input
                className={
                  errors?.password && styles.input_error + " " + styles.input
                }
                id="password"
                placeholder="Senha"
                type="password"
                {...register("password", {
                  required: true,
                  minLength: 8,
                })}
              />
              {errors?.password?.type === "required" && (
                <span className={styles.error_message}>
                  A senha é obrigatória.
                </span>
              )}
              {errors?.password?.type === "minLength" && (
                <span className={styles.error_message}>
                  A senha deve ter no mínimo 8 caracteres
                </span>
              )}
            </div> */}

            <div className={styles.field + " " + styles.button_field}>
              <button type="submit">CADASTRAR</button>
            </div>

            <div className={styles.form_link}>
              <span>
                Já tem uma conta?{" "}
                <Link
                  href="/Login"
                  className={styles.signup_link + " " + styles.a}
                >
                  Entre
                </Link>
              </span>
            </div>
          </form>
        </div>
        <PopUp trigger={showPopUp} setTrigger={setShowPopUp}>
          <h3>Cadastro realizado com sucesso!</h3>
        </PopUp>
      </div>
    </section>
  );
}

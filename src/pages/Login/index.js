import styles from "../../styles/Login.module.css";
import Link from "next/link";
import validator from "validator";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { getSession, signIn } from "next-auth/react";
import { BsFacebook, BsGithub, BsGoogle } from "react-icons/bs";

export default function Login() {
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function handleSignIn(data) {
    try {
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
      }).catch((error) => {
        console.error(error, "error");
      });
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <section className={styles.container + " " + styles.forms}>
      <div className={styles.form + " " + styles.login}>
        <div className={styles.form_content}>
          <header>Faça seu Login</header>

          <form
            onSubmit={handleSubmit(handleSignIn)}
            className={styles.formClass}
          >
            <div className={styles.field + " " + styles.input_field}>
              <input
                className={
                  errors?.email && styles.input_error + " " + styles.input
                }
                id="email"
                type="email"
                placeholder="E-mail"
                disabled={true}
                {...register("email", {
                  required: true,
                  validate: (value) => validator.isEmail(value),
                })}
              />
              {errors?.email?.type === "required" && (
                <span className={styles.error_message}>Insira um e-mail</span>
              )}
              {errors?.email?.type === "validate" && (
                <span className={styles.error_message}>
                  O e-mail é inválido. Formato esperado: exemplo@exemplo.com
                </span>
              )}
              {error && <span className={styles.error_message}>{error}</span>}
            </div>

            <div className={styles.field + " " + styles.input_field}>
              <input
                className={
                  errors?.password && styles.input_error + " " + styles.password
                }
                id="password"
                placeholder="Senha"
                type="password"
                disabled={true}
                {...register("password", { required: true })}
              />
              {errors?.password?.type === "required" && (
                <span className={styles.error_message}>Insira uma senha</span>
              )}
              {error && <span className={styles.error_message}>{error}</span>}
            </div>

            <div className={styles.form_link}>
              <Link href="#" className={styles.forgot_pass + " " + styles.a}>
                Esqueci minha senha
              </Link>
            </div>

            <div className={styles.field + " " + styles.button_field}>
              <button type="submit" disabled={true}>
                ENTRAR
              </button>
            </div>

            <div className={styles.form_link}>
              <span>
                Não tem uma conta?{" "}
                <Link
                  href="/Register"
                  className={styles.signup_link + " " + styles.a}
                >
                  Cadastre-se
                </Link>
              </span>
            </div>
          </form>
        </div>
        <div className={styles.line}></div>
        <div className={styles.media_options}>
          <button
            className={styles.field + " " + styles.google}
            type="button"
            onClick={() => signIn("google")}
          >
            <BsGoogle /> Entre com o Google
          </button>
          <button
            className={styles.field + " " + styles.github}
            type="button"
            onClick={() => signIn("github")}
          >
            <BsGithub /> Entre com o Github
          </button>
          {/* <button
            className={styles.field + " " + styles.facebook}
            type="button"
            onClick={() => signIn("facebook")}
          >
            <BsFacebook /> Entre com o Facebook
          </button> */}
        </div>
      </div>
    </section>
  );
}

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  if (session) {
    return {
      redirect: {
        destination: "/Perfil",
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

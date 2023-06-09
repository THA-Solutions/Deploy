import styles from "../styles/RegisterFormProducts.module.css";
import { useForm } from "react-hook-form";

export default function RegisterProducts() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (body) => {
    try {
      // cadastro no banco
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className={styles.container}>
      <h1>Cadastro Produto</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputContainer}>
          <input
            className={
              errors?.titulo && styles.input_error + " " + styles.input
            }
            id="titulo"
            placeholder="Titulo"
            type="text"
            {...register("titulo", { required: true })}
          />
          {errors?.titulo?.type === "required" && (
            <span className={styles.error_message}>
              O Titulo é obrigatório.
            </span>
          )}
        </div>

        <div className={styles.inputContainer}>
          <input
            className={errors?.marca && styles.input_error + " " + styles.input}
            id="marca"
            placeholder="Marca"
            type="text"
            {...register("marca", { required: true })}
          />
          {errors?.marca?.type === "required" && (
            <span className={styles.error_message}>A Marca é obrigatória.</span>
          )}
        </div>

        <div className={styles.inputContainer}>
          <input
            className={
              errors?.categoria && styles.input_error + " " + styles.input
            }
            id="categoria"
            placeholder="Categoria"
            type="text"
            {...register("categoria", { required: true })}
          />
          {errors?.categoria?.type === "required" && (
            <span className={styles.error_message}>
              A Categoria é obrigatória.
            </span>
          )}
        </div>

        <div className={styles.inputContainer}>
          <input
            className={
              errors?.modelo && styles.input_error + " " + styles.input
            }
            id="modelo"
            placeholder="Modelo"
            type="text"
            {...register("modelo", { required: true })}
          />
          {errors?.modelo?.type === "required" && (
            <span className={styles.error_message}>
              O Modelo é obrigatório.
            </span>
          )}
        </div>

        <div className={styles.inputContainer}>
          <input
            className={
              errors?.quantidade && styles.input_error + " " + styles.input
            }
            id="quantidade"
            placeholder="Quantidade"
            type="number"
            {...register("quantidade", { required: true })}
          />
          {errors?.quantidade?.type === "required" && (
            <span className={styles.error_message}>
              A Quantidade é obrigatória.
            </span>
          )}
        </div>

        <div className={styles.inputContainer}>
          <input
            className={errors?.preco && styles.input_error + " " + styles.input}
            id="preco"
            placeholder="Preço"
            type="text"
            {...register("preco", { required: true })}
          />
          {errors?.preco?.type === "required" && (
            <span className={styles.error_message}>O Preço é obrigatório.</span>
          )}
        </div>

        <div className={styles.inputContainer}>
          <input
            className={
              errors?.descricao && styles.input_error + " " + styles.input
            }
            id="descricao"
            placeholder="Descrição"
            type="text"
            {...register("descricao", { required: true })}
          />
          {errors?.descricao?.type === "required" && (
            <span className={styles.error_message}>
              A descrição é obrigatória.
            </span>
          )}
        </div>

        <div className={styles.inputContainer}>
          <input
            className={errors?.peso && styles.input_error + " " + styles.input}
            id="peso"
            placeholder="Peso"
            type="number"
            {...register("peso")}
          />
        </div>

        <div className={styles.inputContainer}>
          <input
            className={
              errors?.altura && styles.input_error + " " + styles.input
            }
            id="altura"
            placeholder="Altura"
            type="number"
            {...register("altura")}
          />
        </div>

        <div className={styles.inputContainer}>
          <input
            className={
              errors?.largura && styles.input_error + " " + styles.input
            }
            id="largura"
            placeholder="Largura"
            type="number"
            {...register("largura")}
          />
        </div>

        <div className={styles.inputContainer}>
          <input
            className={
              errors?.comprimento && styles.input_error + " " + styles.input
            }
            id="comprimento"
            placeholder="Comprimento"
            type="number"
            {...register("comprimento")}
          />
        </div>
        <button type="submit">Enviar</button>
      </form>
    </section>
  );
}

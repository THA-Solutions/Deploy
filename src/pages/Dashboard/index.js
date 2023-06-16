import { useForm } from "react-hook-form";
import styles from "@/styles/Products.module.css";
export default function addProduct(){
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
    
     const handleAdd = async (data) => {
     } 
    return(
    <section>
        <div>
        <form
            onSubmit={handleSubmit(handleAdd)}
            className={styles.formClass}
          >  
        <h2>Informacoes</h2>
        <input
                id="titulo_produto"
                type="titulo_produto"
                placeholder="Titulo do Produto"
                disabled={false}
                {...register("titulo_produto", {
                  required: true,
                  //validate: (value) => validator.isEmail(value),
                })}
        />

        <input
                id="marca_produto"
                type="marca_produto"
                placeholder="Marca do Produto"
                disabled={false}
                {...register("marca_produto", {
                  required: true,
                  //validate: (value) => validator.isEmail(value),
                })}
        />

        <input
                id="categoria"
                type="categoria"
                placeholder="Categoria"
                disabled={false}
                {...register("categoria", {
                  required: true,
                  //validate: (value) => validator.isEmail(value),
                })}
        />



        <input
                id="modelo"
                type="modelo"
                placeholder="Modelo"
                disabled={false}
                {...register("Modelo", {
                  required: true,
                  //validate: (value) => validator.isEmail(value),
                })}
        />
        <input
                id="descricao"
                type="descricao"
                placeholder="Descricao"
                disabled={false}
                {...register("descricao", {
                  required: true,
                  //validate: (value) => validator.isEmail(value),
                })}
        />
        <input
                id="preco"
                type="preco"
                placeholder="Preco"
                disabled={false}
                {...register("preco", {
                  required: true,
                  //validate: (value) => validator.isEmail(value),
                })}
        />
        <h2>Caracteristicas Fisicas</h2>

        <input
                id="peso"
                type="peso"
                placeholder="Peso"
                disabled={false}
                {...register("peso", {
                  required: true,
                  //validate: (value) => validator.isEmail(value),
                })}
        />  
     <input
                id="altura"
                type="altura"
                placeholder="Altura"
                disabled={false}
                {...register("altura", {
                  required: true,
                  //validate: (value) => validator.isEmail(value),
                })}
        />

    <input
                id="largura"
                type="largura"
                placeholder="Largura"
                disabled={false}
                {...register("largura", {
                  required: true,
                  //validate: (value) => validator.isEmail(value),
                })}
        />
    <input
                id="comprimento"
                type="comprimento"
                placeholder="Comprimento"
                disabled={false}
                {...register("comprimento", {
                  required: true,
                  //validate: (value) => validator.isEmail(value),
                })}
        />
    <input
                id="divisao"
                type="divisao"
                placeholder="Divisao"
                disabled={false}
                {...register("divisao", {
                  required: true,
                  //validate: (value) => validator.isEmail(value),
                })}
        />
        </form>
        </div>

        <section>
        <h2>Especificações</h2>
          <form>

          <input
                id="potencia_entrada"
                type="potencia_entrada"
                placeholder="Potencia de Entrada"
                disabled={false}
                {...register("potencia_entrada", {
                  required: true,
                  //validate: (value) => validator.isEmail(value),
                })}
        /> 

        <input
                id="potencia_saida"
                type="potencia_saida"
                placeholder="Potencia de Saida"
                disabled={false}
                {...register("potencia_saida", {
                  required: true,
                  //validate: (value) => validator.isEmail(value),
                })}
        /> 

        <input
                id="corrente_entrada"
                type="corrente_entrada"
                placeholder="Correte de Entrada"
                disabled={false}
                {...register("corrente_entrada", {
                  required: true,
                  //validate: (value) => validator.isEmail(value),
                })}
        /> 

<input
                id="corrente_entrada"
                type="corrente_saida"
                placeholder="Correte de Saida"
                disabled={false}
                {...register("corrente_saida", {
                  required: true,
                  //validate: (value) => validator.isEmail(value),
                })}
        /> 

          <input
                id="quantidade_mppt"
                type="quantidade_mppt"
                placeholder="Quantidade de MPPTs (Inversores) "
                disabled={false}
                {...register("quantidade_mppt", {
                  required: true,
                  //validate: (value) => validator.isEmail(value),
                })}
        /> 
        
          </form>
        </section>
    </section>
        )
};


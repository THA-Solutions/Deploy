import axios from "axios";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import styles from "@/styles/EditingProduct.module.css";
import { getSession, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";
import UInumber from "@/UI/UInumber";

export async function getServerSideProps(context) {
  const { params } = context; 
  const id = params.id_produto;
  try {
    const productData = await axios
      .get(`${process.env.BASE_URL}/api/product/getProductByID`, {
        params: {
          id: id,
        },
      })
      .then((response) => {
        return response.data;
      });
    return {
      props: {
        produto: productData,
      },
    };
  } catch (error) {
    console.error("Erro ao carregar a pagina de edicao dos produtos");
  }
}

export default function addProduto({ produto }) {
  let [file, setFile] = useState(null);
  const [divisao, setDivisao] = useState(produto.divisao);
  const [categoria, setCategoria] = useState(produto.categoria);
  const router = useRouter();
  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  //Declaracao de variaveis

  useEffect(() => {
    Object.keys(produto).map((key) => {
      setValue(key, produto[key]);
    });
  }, []);
  //Preenche os campos com os valores do produto(utilizando como primeiro parametro o nome do-
  // campo e como segundo o valor do campo)

  function capitalizeFirstLetter(string) {
    string = string.replace(/_/g, " ");
    string = string.replace(/produto/g, " ");
    string = string.replace(/qtde fardo/g, "Unidades por fardo");
    string = string.replace(/tensao entrada/g, "Tensão de entrada");
    string = string.replace(/tensao saida/g, "Tensão de saída");
    string = string.replace(/potencia/g, "Potência");
    string = string.replace(/corrente/g, "Corrente");
    string = string.replace(/tensao/g, "Tensão");
    string = string.replace(/conexao/g, "Conexão");
    string = string.replace(/frequencia/g, "Frequência");

    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  //Funcao que deixa a primeira letra de uma string maiuscula

  const handleEdit = async (data, e) => {
    e.preventDefault();

    const attProduto = await axios.put(
      `${process.env.BASE_URL}/api/dashboard/updateProduct`,
      data
    );
  };
  //Funcao que envia os dados para o backend

  return (
    <>
      <section className={styles.container}>
        <form
          onSubmit={handleSubmit(handleEdit)}
          className={styles.external_container}
        >
          <div className={styles.information}>
            <div className={styles.general_infos}>
              <div className={styles.indicie}>
                <label>Informações </label>
              </div>
              <div className={styles.titulo}>
                <label className={styles.sub_cat}>Titulo</label>
                <input
                  id="titulo_produto"
                  type="titulo_produto"
                  placeholder="Titulo do Produto"
                  {...register("titulo_produto", {
                    required: true,
                  })}
                />
              </div>

              <div className={styles.divisao}>
                <label className={styles.sub_cat}>Divisão</label>
                <select
                  id="divisao"
                  name="divisao"
                  value={divisao}
                  onChange={(e) => setDivisao(e.target.value)}
                  type="divisao"
                >
                  <option value="Solar">Solar</option>
                  <option value="Bebidas">Bebidas</option>
                </select>
              </div>

              <div className={styles.categoria}>
                <label className={styles.sub_cat}>Categoria</label>
                <select
                  id="categoria"
                  name="categoria"
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  type="categoria"
                >
                  {divisao === "Solar" ? (
                    <>
                      <option value="Inversor On-Grid">Inversor On-Grid</option>
                      <option value="Inversor Off-Grid">
                        Inversor Off-Grid
                      </option>
                      <option value="Carregador Veicular">
                        Carregador Veicular
                      </option>
                      <option value="Monitoramento">Monitoramento</option>
                      <option value="MicroInversor">MicroInversor</option>
                      <option value="Painel Solar">Painel Solar</option>
                    </>
                  ) : divisao === "Bebidas" ? (
                    <>
                      <option value="Água Mineral">Água Mineral</option>
                      <option value="Energético">Energético</option>
                      <option value="Refrigerante">Refrigerante</option>
                    </>
                  ) : (
                    <option value="Bebidas">Bebidas</option>
                  )}
                </select>
              </div>

              <div className={styles.modelo}>
                <label className={styles.sub_cat}>Modelo</label>
                <input
                  id="modelo"
                  type="modelo"
                  placeholder="Modelo"
                  {...register("modelo", {
                    required: true,
                  })}
                />
              </div>

              <div className={styles.descricao}>
                <label className={styles.sub_cat}>Descrição</label>
                <textarea
                  type="descricao"
                  id="descricao"
                  placeholder="Descricao"
                  {...register("descricao", {
                    required: true,
                  })}
                />
              </div>
              <div className={styles.quantidade_preco_file}>
                <div className={styles.quantidade}>
                  <label className={styles.sub_cat}>Quantidade</label>
                  <input
                    id="quantidade"
                    type="quantidade"
                    placeholder="Quantidade"
                    {...register("quantidade", {
                      required: true,
                    })}
                  />
                </div>

                <div className={styles.preco}>
                  <label className={styles.sub_cat}>Preço</label>
                  <input
                    id="preco"
                    type="preco"
                    placeholder="Preco"
                    {...register("preco", {
                      required: true,
                    })}
                  />
                </div>

                <div className={styles.file}>
                  <input
                    type="file"
                    name="file"
                    id="fileInput"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                  {getValues("img_url") ? (
                    <div className={styles.img}>
                      <Image
                        src={getValues("img_url")}
                        alt="Thumbnail"
                        width={100}
                        height={100}
                      />
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            <div className={styles.produto_area}>
              <div className={styles.indicie}>
                <label>Caracteristicas do produto</label>
              </div>
              <div className={styles.caracteristicas}>
                <div className={styles.peso_altura}>
                  <div className={styles.peso}>
                    <label className={styles.sub_cat}>Peso </label>

                    <input
                      id="peso"
                      type="peso"
                      placeholder="Peso"
                      {...register("peso", {
                        required: true,
                      })}
                    />
                  </div>

                  <div className={styles.altura}>
                    <label className={styles.sub_cat}>Altura </label>
                    <input
                      id="altura"
                      type="altura"
                      placeholder="Altura"
                      {...register("altura", {
                        required: true,
                      })}
                    />
                  </div>
                </div>
                <div className={styles.comprimento_largura}>
                  <div className={styles.largura}>
                    <label className={styles.sub_cat}>Largura </label>
                    <input
                      id="largura"
                      type="largura"
                      placeholder="Largura"
                      {...register("largura", {
                        required: true,
                      })}
                    />
                  </div>

                  <div className={styles.comprimento}>
                    <label className={styles.sub_cat}>Comprimento </label>
                    <input
                      id="comprimento"
                      type="comprimento"
                      placeholder="Comprimento"
                      {...register("comprimento", {
                        required: true,
                      })}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.produto_infos}>
              <div className={styles.indicie}>
                <label>Informações do produto</label>
              </div>
              <div className={styles.produto_props}>
                {Object.keys(produto)
                  .filter(
                    (key) =>
                      key !== "img_url" &&
                      key !== "status" &&
                      key !== "descricao" &&
                      key !== "divisao" &&
                      key !== "altura" &&
                      key !== "largura" &&
                      key !== "comprimento" &&
                      key !== "peso" &&
                      key !== "quantidade" &&
                      key !== "preco" &&
                      key !== "modelo" &&
                      key !== "titulo" &&
                      key !== "categoria" &&
                      !/^id_/.test(key)
                  )
                  .map((key) => {
                    return produto[key] !== null && produto[key] !== "" ? (
                      <>
                        <div>
                          <label>{`${capitalizeFirstLetter(key)}`}</label>
                          <textarea
                            id={`${key}`}
                            type={`${key}`}
                            {...register(`${key}`, {
                              required: true,
                            })}
                          />
                        </div>
                      </>
                    ) : null;
                  })}
              </div>
              <div className={styles.botoes}>
                <button
                  onClick={() => {
                    router.push("/Dashboard");
                  }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  onClick={() => {
                    router.push("/Dashboard");
                  }}
                >
                  Alterar Produto
                </button>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
}

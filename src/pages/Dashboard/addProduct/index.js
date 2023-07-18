import { set, useForm } from "react-hook-form";
import styles from "@/styles/AddProduct.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/constants/constants";
import Image from "next/image";
import { useRouter } from "next/router";
import { getSession, signOut, useSession } from "next-auth/react";

export default function addProduct() {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const { data: session } = useSession();
  const [titulo, setTitulo] = useState("");
  const [marca, setMarca] = useState("");
  const [divisao, setDivisao] = useState("Solar");
  const [categoria, setCategoria] = useState("Inversor On-Grid");
  let [file, setFile] = useState(null);
  //Define as variaveis de estado

  const router = useRouter();

  //useEffect(() => {
  //  if (session?.user?.permissions !== "admin") {
  //    router.push("/Products");
  //  }
  //}, [session]);

  const handleAdd = async (data, e) => {
    e.preventDefault();
    //Previne o comportamento padrão do formulário

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "uploads");

    //Identifica image,marca e modelo que serao utilizados para o armazenamento das imagens
    const imagemProduto = await fetch(
      "https://api.cloudinary.com/v1_1/dbnjz7ugi/image/upload",
      {
        method: "POST",
        body: formData,
      }
    ).then((r) => r.json());

    data.url = imagemProduto.secure_url;

    const produto = await axios.post(
      `${BASE_URL}/api/dashboard/createProduct`,
      data
    );
    //Adiciona o produto no banco de dados
    setTitulo("");
    setMarca("");
    reset();
    return;
  };

  const divisaoSolar = [
    "Inversor On-Grid",
    "Inversor Off-Grid",
    "Carregador Veicular",
    "Monitoramento",
    "MicroInversor",
    "Painel Solar",
  ];

  const divisaoBebidas = ["Água Mineral", "Energético", "Refrigerante"]; //Define as categorias de bebidas

  useEffect(() => {
    setValue("divisao", divisao);
    setValue("categoria", categoria);
    setValue("titulo_produto", titulo);
    setValue("marca_produto", marca);
  }, [divisao, categoria, titulo, marca]); //Define a divisao e a categoria inicial

  function selectCategory(event) {
    let value = event.target.value;
    value === "Solar" || value === "Bebidas"
      ? (reset(),
        setValue("divisao", value),
        setDivisao(value),
        value === "Solar"
          ? setCategoria("Inversor On-Grid")
          : setCategoria("Água Mineral"),
        setValue("categoria", categoria),
        setValue("titulo_produto", titulo),
        setValue("marca_produto", marca))
      : divisaoSolar.includes(value)
      ? (setCategoria(value),
        reset(),
        setValue("categoria", categoria),
        setDivisao("Solar"),
        setValue("divisao", divisao),
        setValue("titulo_produto", titulo),
        setValue("marca_produto", marca))
      : (setCategoria(value),
        setValue("categoria", categoria),
        setValue("titulo_produto", titulo),
        setValue("marca_produto", marca),
        setDivisao("Bebidas"),
        setValue("divisao", divisao));
  } //funcao para selecionar a categoria e a divisao do produto,tambem verifica a divisao a qual a categoria pertence e limpa os atributos presentes no register(Salvo os atributos de titulo e marca que sao usados para o cadastro de produtos,assim como categoria e divisao)

  return (
    <section>
      <form onSubmit={handleSubmit(handleAdd)} className={styles.formClass}>
        <div className={styles.general_infos}>
          <div className={styles.cat_label}>
            <h2>Informacoes</h2>
          </div>
          <div className={styles.title_brand}>
            <div className={styles.title}>
              <p>Titulo : </p>
              <input
                id="titulo_produto"
                type="titulo_produto"
                placeholder="Titulo do Produto"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
              />
              {errors?.titulo_produto?.type === "required" && (
                <span className={styles.error_message}>
                  Insira um Titulo para o Produto
                </span>
              )}
            </div>

            <div className={styles.brand}>
              <p>Marca :</p>
              <input
                id="marca_produto"
                type="marca_produto"
                onChange={(e) => setMarca(e.target.value)}
                placeholder="Marca do Produto"
                value={marca}
              />
              {errors?.marca_produto?.type === "required" && (
                <span className={styles.error_message}>
                  Associe este produto a uma Marca
                </span>
              )}
            </div>
          </div>

          <div className={styles.div_cat_mod}>
            <div className={styles.division}>
              <p>Divisao : </p>
              <select
                id="divisao"
                name="divisao"
                value={divisao}
                onChange={selectCategory}
                type="divisao"
              >
                <option value="Solar">Solar</option>
                <option value="Bebidas">Bebidas</option>
              </select>
            </div>
            <div className={styles.category}>
              <p>Categoria:</p>
              <select
                id="categoria"
                name="categoria"
                onChange={selectCategory}
                value={categoria}
                type="categoria"
              >
                {divisao === "Solar" ? (
                  <>
                    <option value="Inversor On-Grid">Inversor On-Grid</option>
                    <option value="Inversor Off-Grid">Inversor Off-Grid</option>
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
            {errors?.categoria?.type === "required" && (
              <span className={styles.error_message}>
                Associe este Produto a uma Categoria
              </span>
            )}
            <div className={styles.model}>
              <p>Modelo : </p>
              <input
                id="modelo"
                type="modelo"
                placeholder="Modelo"
                {...register("modelo", {
                  required: true,
                })}
              />
              {errors?.modelo?.type === "required" && (
                <span className={styles.error_message}>
                  Informe o modelo deste produto
                </span>
              )}
            </div>
          </div>
          <div className={styles.qtd_price}>
            <div className={styles.qtd}>
              <p>Quantidade : </p>
              <input
                id="quantidade"
                type="quantidade"
                placeholder="Quantidade"
                {...register("quantidade", {
                  required: true,
                })}
              />
            </div>
            {errors?.quantidade?.type === "required" && (
              <span className={styles.error_message}>
                Informe a quantidade deste produto em estoque
              </span>
            )}
            <div className={styles.price}>
              <p>Preço (R$): </p>
              <input
                id="preco"
                type="preco"
                placeholder="Preco"
                {...register("preco", {
                  required: true,
                })}
              />
              {errors?.preco?.type === "required" && (
                <span className={styles.error_message}>
                  Informe o preço deste produto
                </span>
              )}
            </div>
          </div>
          <div className={styles.desc}>
            <p>Descricao : </p>
            <textarea
              id="descricao"
              type="descricao"
              placeholder="Descricao"
              {...register("descricao", {
                required: true,
              })}
            />
          </div>
          {/**_______________________________________________________________________________________*/}
          <div className={styles.div_img}>
            <input
              type="file"
              name="file"
              id="fileInput"
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            />
            {file ? (
              <div className={styles.img_preview}>
                <Image
                  src={URL.createObjectURL(file)}
                  alt={`thumbnail ${file.name}`}
                  width={100}
                  height={100}
                />
              </div>
            ) : null}
          </div>
          {/**___________________________________Upload dos arquivos ________________________________*/}
        </div>
        <div className={styles.product_area}>
          <div className={styles.details}>
            <div className={styles.cat_label}>
              <h2>Caracteristicas Fisicas</h2>
            </div>
            <div className={styles.proportions}>
              <div className={styles.weight}>
                <p>Peso : </p>
                <input
                  id="peso"
                  type="peso"
                  placeholder="Peso"
                  {...register("peso", {
                    required: true,
                  })}
                />
                {errors?.peso?.type === "required" && (
                  <span className={styles.error_message}>
                    Informe o peso do produto
                  </span>
                )}
              </div>

              <div className={styles.height}>
                <p>Altura : </p>
                <input
                  id="altura"
                  type="altura"
                  placeholder="Altura"
                  {...register("altura", {
                    required: true,
                  })}
                />
                {errors?.altura?.type === "required" && (
                  <span className={styles.error_message}>
                    Informe a altura do produto
                  </span>
                )}
              </div>
              <div className={styles.width}>
                <p>Largura : </p>
                <input
                  id="largura"
                  type="largura"
                  placeholder="Largura"
                  {...register("largura", {
                    required: true,
                  })}
                />
                {errors?.largura?.type === "required" && (
                  <span className={styles.error_message}>
                    Informe a largura do produto
                  </span>
                )}
              </div>
              <div className={styles.length}>
                <p>Comprimento : </p>
                <input
                  id="comprimento"
                  type="comprimento"
                  placeholder="Comprimento"
                  {...register("comprimento", {
                    required: true,
                  })}
                />
                {errors?.comprimento?.type === "required" && (
                  <span className={styles.error_message}>
                    Informe o comprimento do produto
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className={styles.produto_infos}>
            <div className={styles.cat_label}>
              <h2>Especificações</h2>
            </div>
            <div className={styles.spec_container}>
              {/^Inversor/.test(categoria) ? (
                //Inversor
                <div className={styles.specs}>
                  <div className={styles.PE}>
                    <p>Potências de Entrada</p>
                    <input
                      id="potencia_entrada"
                      type="potencia_entrada"
                      placeholder="Potencia de Entrada"
                      {...register("potencia_entrada", {
                        required: true,
                      })}
                    />
                    {errors?.potencia_entrada?.type === "required" && (
                      <span className={styles.error_message}>
                        Informe a potencia de entrada
                      </span>
                    )}
                  </div>
                  <div className={styles.PS}>
                    <p>Potências de Saida</p>
                    <input
                      id="potencia_saida"
                      type="potencia_saida"
                      placeholder="Potencia de Saida"
                      {...register("potencia_saida", {
                        required: true,
                      })}
                    />
                    {errors?.potencia_saida?.type === "required" && (
                      <span className={styles.error_message}>
                        Informe a potencia de saida
                      </span>
                    )}
                  </div>

                  <div className={styles.CE}>
                    <p>Corrente de Entrada</p>
                    <input
                      id="corrente_entrada"
                      type="corrente_entrada"
                      placeholder="Correte de Entrada"
                      {...register("corrente_entrada", {
                        required: true,
                      })}
                    />
                    {errors?.corrente_entrada?.type === "required" && (
                      <span className={styles.error_message}>
                        Informe a corrente de entrada
                      </span>
                    )}
                  </div>

                  <div className={styles.CS}>
                    <p>Corrente de Saida</p>
                    <input
                      id="corrente_saida"
                      type="corrente_saida"
                      placeholder="Correte de Saida"
                      {...register("corrente_saida", {
                        required: true,
                      })}
                    />
                    {errors?.corrente_saida?.type === "required" && (
                      <span className={styles.error_message}>
                        Informe a corrente de saida
                      </span>
                    )}
                  </div>

                  <div className={styles.QM}>
                    <p>Quantidade de MPPTs</p>
                    <input
                      id="quantidade_mppt"
                      type="quantidade_mppt"
                      placeholder="Quantidade de MPPTs"
                      {...register("quantidade_mppt", {
                        required: true,
                      })}
                    />
                    {errors?.quantidade_mppt?.type === "required" && (
                      <span className={styles.error_message}>
                        Informe a quantidade de MPPTs
                      </span>
                    )}
                  </div>
                </div>
              ) : //Fim Inversor
              /^Painel/.test(categoria) ? (
                //Painel
                <div className={styles.specs}>
                  <div className={styles.E}>
                    <p>Eficiencia</p>
                    <input
                      id="eficiencia"
                      type="eficiencia"
                      placeholder="Eficiencia"
                      {...register("eficiencia", {
                        required: true,
                      })}
                    />
                    {errors?.eficiencia?.type === "required" && (
                      <span className={styles.error_message}>
                        Informe a eficiencia do painel
                      </span>
                    )}
                  </div>

                  <div className={styles.TC}>
                    <p>Tipo de Célula</p>
                    <input
                      id="tipo_celula"
                      type="tipo_celula"
                      placeholder="Tipo de Célula"
                      {...register("tipo_celula", {
                        required: true,
                      })}
                    />
                    {errors?.tipo_celula?.type === "required" && (
                      <span className={styles.error_message}>
                        Informe o tipo de célula
                      </span>
                    )}
                  </div>

                  <div className={styles.PM}>
                    <p>Potência do Modulo</p>
                    <input
                      id="potencia_modulo"
                      type="potencia_modulo"
                      placeholder="Potência do modulo"
                      {...register("potencia_modulo", {
                        required: true,
                      })}
                    />
                    {errors?.potencia_modulo?.type === "required" && (
                      <span className={styles.error_message}>
                        Informe a potência do modulo
                      </span>
                    )}
                  </div>

                  <div className={styles.TCA}>
                    <p>Tensão de Circuito Aberto</p>
                    <input
                      id="tensao_circuitoaberto"
                      type="tensao_circuitoaberto"
                      placeholder="Tensão de Circuito Aberto"
                      {...register("tensao_circuitoaberto", {
                        required: true,
                      })}
                    />
                    {errors?.tensao_circuitoaberto?.type === "required" && (
                      <span className={styles.error_message}>
                        Informe a tensão de circuito aberto
                      </span>
                    )}
                  </div>

                  <div className={styles.TP}>
                    <p>Tensão de Potencia</p>
                    <input
                      id="tensao_potencia"
                      type="tensao_potencia"
                      placeholder="Tensão de Potencia"
                      {...register("tensao_potencia", {
                        required: true,
                      })}
                    />
                    {errors?.tensao_potencia?.type === "required" && (
                      <span className={styles.error_message}>
                        Informe a tensão de potência
                      </span>
                    )}
                  </div>

                  <div className={styles.TS}>
                    <p>Tensão de Sistema</p>
                    <input
                      id="tensao_sistema"
                      type="tensao_sistema"
                      placeholder="Tensão do Sistema"
                      {...register("tensao_sistema", {
                        required: true,
                      })}
                    />
                    {errors?.tensao_sistema?.type === "required" && (
                      <span className={styles.error_message}>
                        Informe a tensão do sistema
                      </span>
                    )}
                  </div>

                  <div className={styles.CC}>
                    <p>Corrente de Curto</p>
                    <input
                      id="corrente_curto"
                      type="corrente_curto"
                      placeholder="Corrente de Curto"
                      {...register("corrente_curto", {
                        required: true,
                      })}
                    />
                    {errors?.corrente_curto?.type === "required" && (
                      <span className={styles.error_message}>
                        Informe a corrente de curto
                      </span>
                    )}
                  </div>

                  <div className={styles.CF}>
                    <p>Corrente de Fusivel</p>
                    <input
                      id="corrente_fusivel"
                      type="corrente_fusivel"
                      placeholder="Corrente de Fusivel"
                      {...register("corrente_fusivel", {
                        required: true,
                      })}
                    />
                    {errors?.corrente_fusivel?.type === "required" && (
                      <span className={styles.error_message}>
                        Informe a corrente de fusivel
                      </span>
                    )}
                  </div>
                </div>
              ) : //Fim Painel
              /^Monitoramento/.test(categoria) ? (
                <div className={styles.specs}>
                  <div className={styles.SV}>
                    <p>Servidor</p>
                    <input
                      id="servidor"
                      type="servidor"
                      placeholder="Servidor"
                      {...register("servidor", {
                        required: true,
                      })}
                    />
                    {errors?.servidor?.type === "required" && (
                      <span className={styles.error_message}>
                        Informe o servidor
                      </span>
                    )}
                  </div>

                  <div className={styles.AL}>
                    <p>Alcance</p>
                    <input
                      id="alcance"
                      type="alcance"
                      placeholder="Alcance Suportado"
                      {...register("alcance", {
                        required: true,
                      })}
                    />
                    {errors?.alcance?.type === "required" && (
                      <span className={styles.error_message}>
                        Informe o alcance suportado
                      </span>
                    )}
                  </div>

                  <div className={styles.TO}>
                    <p>Tensão de Operação</p>
                    <input
                      id="tensao_operacao"
                      type="tensao_operacao"
                      placeholder="Tensao de Operacao"
                      {...register("tensao_operacao", {
                        required: true,
                      })}
                    />
                    {errors?.tensao_operacao?.type === "required" && (
                      <span className={styles.error_message}>
                        Informe a tensão de operação
                      </span>
                    )}
                  </div>

                  <div className={styles.CONS}>
                    <p>Consumo</p>
                    <input
                      id="consumo"
                      type="consumo"
                      placeholder="Consumo"
                      {...register("consumo", {
                        required: true,
                      })}
                    />
                    {errors?.consumo?.type === "required" && (
                      <span className={styles.error_message}>
                        Informe o consumo
                      </span>
                    )}
                  </div>
                </div>
              ) : //Fim Monitoramento
              //Carregamento
              /^Carregamento/.test(categoria) ? (
                <div className={styles.specs}>
                  <div className={styles.PS}>
                    <p>Potência Suportada</p>
                    <input
                      id="potencia"
                      type="potencia"
                      placeholder="Potencia"
                      {...register("potencia", {
                        required: true,
                      })}
                    />
                    {errors?.potencia?.type === "required" && (
                      <span className={styles.error_message}>
                        Informe a potência
                      </span>
                    )}
                  </div>

                  <div className={styles.CON}>
                    <p>Tipo de Conexao</p>
                    <input
                      id="conexao"
                      type="conexao"
                      placeholder="Tipo de Conexao"
                      {...register("conexao", {
                        required: true,
                      })}
                    />
                    {errors?.conexao?.type === "required" && (
                      <span className={styles.error_message}>
                        Informe o tipo de conexão
                      </span>
                    )}
                  </div>

                  <div className={styles.TE}>
                    <p>Tensão de Entrada</p>
                    <input
                      id="tensao_entrada"
                      type="tensao_entrada"
                      placeholder="Tensao de entrada"
                      {...register("tensao_entrada", {
                        required: true,
                      })}
                    />
                    {errors?.tensao_entrada?.type === "required" && (
                      <span className={styles.error_message}>
                        Informe a tensão de entrada
                      </span>
                    )}
                  </div>

                  <div className={styles.PL}>
                    <p>Polaridade</p>
                    <input
                      id="polos"
                      type="polos"
                      placeholder="Polaridade"
                      {...register("polos", {
                        required: true,
                      })}
                    />
                    {errors?.polos?.type === "required" && (
                      <span className={styles.error_message}>
                        Informe a polaridade
                      </span>
                    )}
                  </div>
                </div>
              ) : //Fim Carregamento
              //Microinversor
              /^MicroInversor/.test(categoria) ? (
                <div className={styles.specs}>
                  <div className={styles.TMPPT}>
                    <p>Tensão Maxima por MPPT</p>
                    <input
                      id="tensao_mppt"
                      type="tensao_mppt"
                      placeholder="Tensao maxima por MPPT"
                      {...register("tensao_mppt", {
                        required: true,
                      })}
                    />
                    {errors?.tensao_mppt?.type === "required" && (
                      <span className={styles.error_message}>
                        Informe a tensão maxima por MPPT
                      </span>
                    )}
                  </div>

                  <div className={styles.TS}>
                    <p>Tensão de Saida</p>
                    <input
                      id="tensao_saida"
                      type="tensao_saida"
                      placeholder="Tensao de Saida"
                      {...register("tensao_saida", {
                        required: true,
                      })}
                    />
                    {errors?.tensao_saida?.type === "required" && (
                      <span className={styles.error_message}>
                        Informe a tensão de saida
                      </span>
                    )}
                  </div>

                  <div className={styles.CC}>
                    <p>Corrente de Curto</p>
                    <input
                      id="corrente_curto"
                      type="corrente_curto"
                      placeholder="Corrente de Curto"
                      {...register("corrente_curto", {
                        required: true,
                      })}
                    />
                    {errors?.corrente_curto?.type === "required" && (
                      <span className={styles.error_message}>
                        Informe a corrente de curto
                      </span>
                    )}
                  </div>

                  <div className={styles.CMPPT}>
                    <p>Corrente Maxima por MPPT</p>
                    <input
                      id="corrente_mppt"
                      type="corrente_mppt"
                      placeholder="Corrente maxima por MPPT"
                      {...register("corrente_mppt", {
                        required: true,
                      })}
                    />
                    {errors?.corrente_mppt?.type === "required" && (
                      <span className={styles.error_message}>
                        Informe a corrente maxima por MPPT
                      </span>
                    )}
                  </div>

                  <div className={styles.CS}>
                    <p>Corrente de Saida</p>
                    <input
                      id="corrente_saida"
                      type="corrente_saida"
                      placeholder="Corrente de Saida"
                      {...register("corrente_saida", {
                        required: true,
                      })}
                    />
                    {errors?.corrente_saida?.type === "required" && (
                      <span className={styles.error_message}>
                        Informe a corrente de saida
                      </span>
                    )}
                  </div>
                  <div className={styles.PS}>
                    <p>Potencia de Saida</p>
                    <input
                      id="potencia_saida"
                      type="potencia_saida"
                      placeholder="Potencia de Saida"
                      {...register("potencia_saida", {
                        required: true,
                      })}
                    />
                    {errors?.potencia_saida?.type === "required" && (
                      <span className={styles.error_message}>
                        Informe a potencia de saida
                      </span>
                    )}
                  </div>
                  <div className={styles.QM}>
                    <p>Quantidade de MPPTs</p>
                    <input
                      id="quantidade_mppt"
                      type="quantidade_mppt"
                      placeholder="Quantidade de MPPTs"
                      {...register("quantidade_mppt", {
                        required: true,
                      })}
                    />
                    {errors?.quantidade_mppt?.type === "required" && (
                      <span className={styles.error_message}>
                        Informe a quantidade de MPPTs
                      </span>
                    )}
                  </div>
                </div>
              ) : //Fim Microinversor
              /^Energético/.test(categoria) ||
                /^Água Mineral/.test(categoria) ||
                /^Refrigerante/.test(categoria) ? (
                <div className={styles.specs}>
                  <div className={styles.V}>
                    <p>Volume</p>
                    <input
                      id="volume"
                      type="volume"
                      placeholder="Volume"
                      {...register("volume", {
                        required: true,
                      })}
                    />
                    {errors?.volume?.type === "required" && (
                      <span className={styles.error_message}>
                        Informe o volume
                      </span>
                    )}
                  </div>

                  <div className={styles.QF}>
                    <p>Quantidade por Fardo</p>
                    <input
                      id="qtde_fardo"
                      type="qtde_fardo"
                      placeholder="Unidades por Fardo"
                      {...register("qtde_fardo", {
                        required: true,
                      })}
                    />
                    {errors?.qtde_fardo?.type === "required" && (
                      <span className={styles.error_message}>
                        Informe a quantidade por fardo
                      </span>
                    )}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div className={styles.add_button}>
          <button type="submit">Adicionar Produto</button>
        </div>
      </form>
    </section>
  );
}

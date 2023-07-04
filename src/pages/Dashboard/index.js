import { set, useForm } from "react-hook-form";
import styles from "@/styles/Products.module.css";
import style from "../../styles/Login.module.css";
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

  useEffect(() => {
    if (session?.user?.permissions !== "admin") {
        router.push("/Products");
    }
}, [session]);




  const handleAdd = async (data, e) => {
    e.preventDefault();
    //Previne o comportamento padrão do formulário

    const formData = new FormData();

    formData.append("file", file);

    console.log(formData.get("file"), "formdata");
    formData.append("upload_preset", "uploads");

    //Identifica image,marca e modelo que serao utilizados para o armazenamento das imagens
    const imagemProduto = await fetch(
      "https://api.cloudinary.com/v1_1/dbnjz7ugi/image/upload",
      {
        method: "POST",
        body: formData,
      }
    ).then((r) => r.json());

    console.log(imagemProduto.secure_url, "url", imagemProduto);

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
        <h2>Informacoes</h2>
        <input
          id="titulo_produto"
          type="titulo_produto"
          placeholder="Titulo do Produto"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        {errors?.titulo_produto?.type === "required" && (
          <span className={style.error_message}>
            Insira um Titulo para o Produto
          </span>
        )}
        <input
          id="marca_produto"
          type="marca_produto"
          onChange={(e) => setMarca(e.target.value)}
          placeholder="Marca do Produto"
          value={marca}
        />
        {errors?.marca_produto?.type === "required" && (
          <span className={style.error_message}>
            Associe este produto a uma Marca
          </span>
        )}
        {}
        <div className={"styles.division"}>
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

        <div className={styles.categoria}>
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
                <option value="Carregador Veicular">Carregador Veicular</option>
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
          <span className={style.error_message}>
            Associe este Produto a uma Categoria
          </span>
        )}
        <input
          id="modelo"
          type="modelo"
          placeholder="Modelo"
          {...register("modelo", {
            required: true,
          })}
        />
        {errors?.modelo?.type === "required" && (
          <span className={style.error_message}>
            Informe o modelo deste produto
          </span>
        )}
        <input
          id="descricao"
          type="descricao"
          placeholder="Descricao"
          {...register("descricao", {
            required: true,
          })}
        />
        <input
          id="quantidade"
          type="quantidade"
          placeholder="Quantidade"
          {...register("quantidade", {
            required: true,
          })}
        />
        {errors?.modelo?.type === "required" && (
          <span className={style.error_message}>
            Informe a quantidade deste produto em estoque
          </span>
        )}
        {/**_______________________________________________________________________________________*/}
        <input
          type="file"
          name="file"
          id="fileInput"
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
        />
        {/**___________________________________Upload dos arquivos ________________________________*/}
        {file
          ? (console.log(file, "file"),
            (
              <Image
                src={URL.createObjectURL(file)}
                alt={`thumbnail ${file.name}`}
                width={100}
                height={100}
              />
            ))
          : null}
        <input
          id="preco"
          type="preco"
          placeholder="Preco"
          {...register("preco", {
            required: true,
          })}
        />
        {errors?.preco?.type === "required" && (
          <span className={style.error_message}>
            Informe o preço deste produto
          </span>
        )}
        <h2>Caracteristicas Fisicas</h2>

        <input
          id="peso"
          type="peso"
          placeholder="Peso"
          {...register("peso", {
            required: true,
          })}
        />
        {errors?.peso?.type === "required" && (
          <span className={style.error_message}>Informe o peso do produto</span>
        )}

        <input
          id="altura"
          type="altura"
          placeholder="Altura"
          {...register("altura", {
            required: true,
          })}
        />
        {errors?.altura?.type === "required" && (
          <span className={style.error_message}>
            Informe a altura do produto
          </span>
        )}
        <input
          id="largura"
          type="largura"
          placeholder="Largura"
          {...register("largura", {
            required: true,
          })}
        />
        {errors?.largura?.type === "required" && (
          <span className={style.error_message}>
            Informe a largura do produto
          </span>
        )}
        <input
          id="comprimento"
          type="comprimento"
          placeholder="Comprimento"
          {...register("comprimento", {
            required: true,
          })}
        />
        {errors?.comprimento?.type === "required" && (
          <span className={style.error_message}>
            Informe o comprimento do produto
          </span>
        )}
        <h2>Especificações</h2>
        {/^Inversor/.test(categoria) ? (
          //Inversor
          <>
            <input
              id="potencia_entrada"
              type="potencia_entrada"
              placeholder="Potencia de Entrada"
              {...register("potencia_entrada", {
                required: true,
              })}
            />
            {errors?.potencia_entrada?.type === "required" && (
              <span className={style.error_message}>
                Informe a potencia de entrada
              </span>
            )}
            <input
              id="potencia_saida"
              type="potencia_saida"
              placeholder="Potencia de Saida"
              {...register("potencia_saida", {
                required: true,
              })}
            />
            {errors?.potencia_saida?.type === "required" && (
              <span className={style.error_message}>
                Informe a potencia de saida
              </span>
            )}
            <input
              id="corrente_entrada"
              type="corrente_entrada"
              placeholder="Correte de Entrada"
              {...register("corrente_entrada", {
                required: true,
              })}
            />
            {errors?.corrente_entrada?.type === "required" && (
              <span className={style.error_message}>
                Informe a corrente de entrada
              </span>
            )}
            <input
              id="corrente_entrada"
              type="corrente_saida"
              placeholder="Correte de Saida"
              {...register("corrente_saida", {
                required: true,
              })}
            />
            {errors?.corrente_saida?.type === "required" && (
              <span className={style.error_message}>
                Informe a corrente de saida
              </span>
            )}
            <input
              id="quantidade_mppt"
              type="quantidade_mppt"
              placeholder="Quantidade de MPPTs"
              {...register("quantidade_mppt", {
                required: true,
              })}
            />
            {errors?.quantidade_mppt?.type === "required" && (
              <span className={style.error_message}>
                Informe a quantidade de MPPTs
              </span>
            )}
          </>
        ) : //Fim Inversor
        /^Painel/.test(categoria) ? (
          //Painel
          <>
            <input
              id="eficiencia"
              type="eficiencia"
              placeholder="Eficiencia"
              {...register("eficiencia", {
                required: true,
              })}
            />
            {errors?.eficiencia?.type === "required" && (
              <span className={style.error_message}>
                Informe a eficiencia do painel
              </span>
            )}
            <input
              id="eficiencia"
              type="eficiencia"
              placeholder="Eficiencia"
              {...register("eficiencia", {
                required: true,
              })}
            />
            {errors?.eficiencia?.type === "required" && (
              <span className={style.error_message}>
                Informe a eficiencia do painel
              </span>
            )}
            <input
              id="tipo_celula"
              type="tipo_celula"
              placeholder="Tipo de Célula"
              {...register("tipo_celula", {
                required: true,
              })}
            />
            {errors?.tipo_celula?.type === "required" && (
              <span className={style.error_message}>
                Informe o tipo de célula
              </span>
            )}
            <input
              id="potencia_modulo"
              type="potencia_modulo"
              placeholder="Potência do modulo"
              {...register("potencia_modulo", {
                required: true,
              })}
            />
            {errors?.potencia_modulo?.type === "required" && (
              <span className={style.error_message}>
                Informe a potência do modulo
              </span>
            )}
            <input
              id="tensao_circuitoaberto"
              type="tensao_circuitoaberto"
              placeholder="Tensão de Circuito Aberto"
              {...register("tensao_circuitoaberto", {
                required: true,
              })}
            />
            {errors?.tensao_circuitoaberto?.type === "required" && (
              <span className={style.error_message}>
                Informe a tensão de circuito aberto
              </span>
            )}
            <input
              id="tensao_potencia"
              type="tensao_potencia"
              placeholder="Tensão de Potencia"
              {...register("tensao_potencia", {
                required: true,
              })}
            />
            {errors?.tensao_potencia?.type === "required" && (
              <span className={style.error_message}>
                Informe a tensão de potência
              </span>
            )}
            <input
              id="tensao_sistema"
              type="tensao_sistema"
              placeholder="Tensão do Sistema"
              {...register("tensao_sistema", {
                required: true,
              })}
            />
            {errors?.tensao_sistema?.type === "required" && (
              <span className={style.error_message}>
                Informe a tensão do sistema
              </span>
            )}
            <input
              id="corrente_curto"
              type="corrente_curto"
              placeholder="Corrente de Curto"
              {...register("corrente_curto", {
                required: true,
              })}
            />
            {errors?.corrente_curto?.type === "required" && (
              <span className={style.error_message}>
                Informe a corrente de curto
              </span>
            )}
            <input
              id="corrente_fusivel"
              type="corrente_fusivel"
              placeholder="Corrente de Fusivel"
              {...register("corrente_fusivel", {
                required: true,
              })}
            />
            {errors?.corrente_fusivel?.type === "required" && (
              <span className={style.error_message}>
                Informe a corrente de fusivel
              </span>
            )}
          </>
        ) : //Fim Painel
        /^Monitoramento/.test(categoria) ? (
          <>
            <input
              id="servidor"
              type="servidor"
              placeholder="Servidor"
              {...register("servidor", {
                required: true,
              })}
            />
            {errors?.servidor?.type === "required" && (
              <span className={style.error_message}>Informe o servidor</span>
            )}
            <input
              id="alcance"
              type="alcance"
              placeholder="Alcance Suportado"
              {...register("alcance", {
                required: true,
              })}
            />
            {errors?.alcance?.type === "required" && (
              <span className={style.error_message}>
                Informe o alcance suportado
              </span>
            )}
            <input
              id="tensao_operacao"
              type="tensao_operacao"
              placeholder="Tensao de Operacao"
              {...register("tensao_operacao", {
                required: true,
              })}
            />
            {errors?.tensao_operacao?.type === "required" && (
              <span className={style.error_message}>
                Informe a tensão de operação
              </span>
            )}
            <input
              id="consumo"
              type="consumo"
              placeholder="Consumo"
              {...register("consumo", {
                required: true,
              })}
            />
            {errors?.consumo?.type === "required" && (
              <span className={style.error_message}>Informe o consumo</span>
            )}
          </>
        ) : //Fim Monitoramento
        //Carregamento
        /^Carregamento/.test(categoria) ? (
          <>
            <input
              id="potencia"
              type="potencia"
              placeholder="Potencia"
              {...register("potencia", {
                required: true,
              })}
            />
            {errors?.potencia?.type === "required" && (
              <span className={style.error_message}>Informe a potência</span>
            )}
            <input
              id="conexao"
              type="conexao"
              placeholder="Tipo de Conexao"
              {...register("conexao", {
                required: true,
              })}
            />
            {errors?.conexao?.type === "required" && (
              <span className={style.error_message}>
                Informe o tipo de conexão
              </span>
            )}
            <input
              id="tensao_entrada"
              type="tensao_entrada"
              placeholder="Tensao de entrada"
              {...register("tensao_entrada", {
                required: true,
              })}
            />
            {errors?.tensao_entrada?.type === "required" && (
              <span className={style.error_message}>
                Informe a tensão de entrada
              </span>
            )}
            <input
              id="polos"
              type="polos"
              placeholder="Polaridade"
              {...register("polos", {
                required: true,
              })}
            />
            {errors?.polos?.type === "required" && (
              <span className={style.error_message}>Informe a polaridade</span>
            )}
          </>
        ) : //Fim Carregamento
        //Microinversor
        /^Microinversor/.test(categoria) ? (
          <>
            <input
              id="tensao_mppt"
              type="tensao_mppt"
              placeholder="Tensao maxima por MPPT"
              {...register("tensao_mppt", {
                required: true,
              })}
            />
            {errors?.tensao_mppt?.type === "required" && (
              <span className={style.error_message}>
                Informe a tensão maxima por MPPT
              </span>
            )}
            <input
              id="tensao_saida"
              type="tensao_saida"
              placeholder="Tensao de Saida"
              {...register("tensao_saida", {
                required: true,
              })}
            />
            {errors?.tensao_saida?.type === "required" && (
              <span className={style.error_message}>
                Informe a tensão de saida
              </span>
            )}
            <input
              id="corrente_curto"
              type="corrente_curto"
              placeholder="Corrente de Curto"
              {...register("corrente_curto", {
                required: true,
              })}
            />
            {errors?.corrente_curto?.type === "required" && (
              <span className={style.error_message}>
                Informe a corrente de curto
              </span>
            )}
            <input
              id="corrente_mppt"
              type="corrente_mppt"
              placeholder="Corrente maxima por MPPT"
              {...register("corrente_mppt", {
                required: true,
              })}
            />
            {errors?.corrente_mppt?.type === "required" && (
              <span className={style.error_message}>
                Informe a corrente maxima por MPPT
              </span>
            )}
            <input
              id="corrente_saida"
              type="corrente_saida"
              placeholder="Corrente de Saida"
              {...register("corrente_saida", {
                required: true,
              })}
            />
            {errors?.corrente_saida?.type === "required" && (
              <span className={style.error_message}>
                Informe a corrente de saida
              </span>
            )}
            <input
              id="potencia_saida"
              type="potencia_saida"
              placeholder="Potencia de Saida"
              {...register("potencia_saida", {
                required: true,
              })}
            />
            {errors?.potencia_saida?.type === "required" && (
              <span className={style.error_message}>
                Informe a potencia de saida
              </span>
            )}
            <input
              id="quantidade_mppt"
              type="quantidade_mppt"
              placeholder="Quantidade de MPPTs"
              {...register("quantidade_mppt", {
                required: true,
              })}
            />
            {errors?.quantidade_mppt?.type === "required" && (
              <span className={style.error_message}>
                Informe a quantidade de MPPTs
              </span>
            )}
          </>
        ) : //Fim Microinversor
        /^Energético/.test(categoria) ||
          /^Água Mineral/.test(categoria) ||
          /^Refrigerante/.test(categoria) ? (
          <>
            <input
              id="volume"
              type="volume"
              placeholder="Volume"
              {...register("volume", {
                required: true,
              })}
            />
            {errors?.volume?.type === "required" && (
              <span className={style.error_message}>Informe o volume</span>
            )}
            <input
              id="qtde_fardo"
              type="qtde_fardo"
              placeholder="Unidades por Fardo"
              {...register("qtde_fardo", {
                required: true,
              })}
            />
            {errors?.qtde_fardo?.type === "required" && (
              <span className={style.error_message}>
                Informe a quantidade por fardo
              </span>
            )}
          </>
        ) : (
          NULL
        )}
        <button type="submit">Adicionar Produto</button>
      </form>
    </section>
  );
}

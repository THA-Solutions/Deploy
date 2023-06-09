import styles from "../styles/Filters.module.css";
import { FilterContext } from "@/context/FilterContext";
import { useContext, useEffect, useState } from "react";

export default function Filters(props) {
  //Props recebe os dados dos produtos do componente Products
  const { handleOnCheckbox, setProdutos } = useContext(FilterContext);
  //handleOnCheckbox -> funcao que filtra os produtos de acordo com os filtros selecionados
  //setProdutos -> funcao que atualiza o estado dos produtos filtrados
  const produtos = props.data;
  //Atribui os dados dos produtos(fornecidas pela pagina products) a uma variavel

  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(localStorage.getItem("value"));
  }, []);

  setProdutos(props.data);

  const sortValues = (productToSort) => {
    return productToSort.sort((productA, productB) => {
      //productA -> valor anterior do array, productB -> valor atual do array
      if (typeof productA === "string" && typeof productB === "string") {
        return productA.localeCompare(productB, undefined, { numeric: true });
      } else {
        return productA - productB;
      }
    });
  }; //Funcao que ordena os valores do array por ordem alfabetica ou numerica

  const filtersToReturn = () => {
    switch (value) {
      case "Solar":
        return (
          <>
            <h2 className={styles.filter_title}>FILTROS</h2>

            {/* Categorias */}
            <div className={styles.filter_category}>
              <h4 className={styles.filter_category_name}>Categorias</h4>

              {sortValues(
                produtos.reduce((acc, item) => {
                  if (!acc.includes(item.categoria)) {
                    acc.push(item.categoria);
                  }
                  return acc;
                }, [])
              ).map((categoria) => {
                return (
                  <div className={styles.link} key={categoria}>
                    <input
                      onChange={handleOnCheckbox}
                      className={styles.filter_checkbox}
                      type="checkbox"
                      name="categoria"
                      id={categoria}
                      value={categoria}
                    />
                    <label
                      className={styles.filter_subcategory}
                      htmlFor={categoria}
                    >
                      {categoria}{" "}
                      {/* inversor | placa solar | carregador veicular | baterias */}
                    </label>
                  </div>
                );
              })}
            </div>

            {/* Marcas */}
            <div className={styles.filter_category}>
              <h4 className={styles.filter_category_name}>Marca</h4>

              {
                sortValues(
                  produtos.reduce((acc, item) => {
                    if (!acc.includes(item.marca)) {
                      acc.push(item.marca);
                    }
                    return acc;
                  }, [])
                ).map((marca) => {
                  return (
                    <div className={styles.link} key={marca}>
                      <input
                        onChange={handleOnCheckbox}
                        className={styles.filter_checkbox}
                        type="checkbox"
                        name="marca"
                        id={marca}
                        value={marca}
                      />
                      <label
                        className={styles.filter_subcategory}
                        htmlFor={marca}
                      >
                        {marca}
                      </label>
                    </div>
                  );
                })
                // O codigo acima passa o array resultande do reduce de marcas para a funcao sortValues que ordena os valores do array por ordem alfabetica ou numerica
              }
            </div>

            {/* Potencia do Modulo */}
            <div className={styles.filter_category}>
              <h4 className={styles.filter_category_name}>
                Potência do Módulo
              </h4>
              {sortValues(
                produtos.reduce((acc, item) => {
                  if (
                    !acc.includes(item.potencia_modulo) &&
                    item.potencia_modulo !== null
                  ) {
                    acc.push(item.potencia_modulo);
                  }
                  return acc;
                }, [])
              ).map((potencia_modulo, index) => {
                return (
                  <div className={styles.link} key={index}>
                    <input
                      onChange={handleOnCheckbox}
                      className={styles.filter_checkbox}
                      type="checkbox"
                      name="potencia_modulo"
                      id={potencia_modulo}
                      value={potencia_modulo}
                    />
                    <label
                      className={styles.filter_subcategory}
                      htmlFor={potencia_modulo}
                    >
                      {potencia_modulo}
                    </label>
                  </div>
                );
              })}
            </div>

            {/* Tensao de Saida */}
            <div className={styles.filter_category}>
              <h4 className={styles.filter_category_name}>Tensão de Saída</h4>
              {sortValues(
                produtos.reduce((acc, item) => {
                  if (
                    !acc.includes(item.tensao_saida) &&
                    item.tensao_saida !== null
                  ) {
                    acc.push(item.tensao_saida);
                  }
                  return acc;
                }, [])
              ).map((tensao_saida, index) => {
                return (
                  <div className={styles.link} key={index}>
                    <input
                      onChange={handleOnCheckbox}
                      className={styles.filter_checkbox}
                      type="checkbox"
                      name="tensao_saida"
                      id={tensao_saida}
                      value={tensao_saida}
                    />
                    <label
                      className={styles.filter_subcategory}
                      htmlFor={tensao_saida}
                    >
                      {tensao_saida}
                    </label>
                  </div>
                );
              })}
            </div>

            {/* Quantidade de MPPTs */}
            <div className={styles.filter_category}>
              <h4 className={styles.filter_category_name}>
                Quantidade de MPPTs
              </h4>
              {sortValues(
                produtos.reduce((acc, item) => {
                  if (
                    item.quantidade_mppt !== null &&
                    !acc.includes(Number(item.quantidade_mppt))
                  ) {
                    acc.push(Number(item.quantidade_mppt));
                  }
                  return acc;
                }, [])
              ).map((quantidade_mppt, index) => {
                return (
                  <div className={styles.link} key={index}>
                    <input
                      onChange={handleOnCheckbox}
                      className={styles.filter_checkbox}
                      type="checkbox"
                      name="quantidade_mppt"
                      id={quantidade_mppt}
                      value={quantidade_mppt}
                    />
                    <label
                      className={styles.filter_subcategory}
                      htmlFor={quantidade_mppt}
                    >
                      {quantidade_mppt}
                    </label>
                  </div>
                );
              })}
            </div>

            {/* Potencia de Saida */}
            <div className={styles.filter_category}>
              <h4 className={styles.filter_category_name}>Potência de Saída</h4>
              {sortValues(
                produtos.reduce((acc, item) => {
                  if (
                    !acc.includes(item.potencia_saida) &&
                    item.potencia_saida !== null
                  ) {
                    acc.push(item.potencia_saida);
                  }
                  return acc;
                }, [])
              ).map((potencia_saida, index) => {
                return (
                  <div className={styles.link} key={index}>
                    <input
                      onChange={handleOnCheckbox}
                      className={styles.filter_checkbox}
                      type="checkbox"
                      name="potencia_saida"
                      id={potencia_saida}
                      value={potencia_saida}
                    />
                    <label
                      className={styles.filter_subcategory}
                      htmlFor={potencia_saida}
                    >
                      {potencia_saida}
                    </label>
                  </div>
                );
              })}
            </div>
          </>
        );
        break;
      case "Bebidas":
        return (
          <>
            <h2 className={styles.filter_title}>FILTROS</h2>

            {/* Categorias */}
            <div className={styles.filter_category}>
              <h4 className={styles.filter_category_name}>Categorias</h4>

              {sortValues(
                produtos.reduce((acc, item) => {
                  if (!acc.includes(item.categoria)) {
                    acc.push(item.categoria);
                  }
                  return acc;
                }, [])
              ).map((categoria) => {
                return (
                  <div className={styles.link} key={categoria}>
                    <input
                      onChange={handleOnCheckbox}
                      className={styles.filter_checkbox}
                      type="checkbox"
                      name="categoria"
                      id={categoria}
                      value={categoria}
                    />
                    <label
                      className={styles.filter_subcategory}
                      htmlFor={categoria}
                    >
                      {categoria}
                    </label>
                  </div>
                );
              })}
            </div>

            {/* Marcas */}
            <div className={styles.filter_category}>
              <h4 className={styles.filter_category_name}>Marca</h4>

              {
                sortValues(
                  produtos.reduce((acc, item) => {
                    if (!acc.includes(item.marca)) {
                      acc.push(item.marca);
                    }
                    return acc;
                  }, [])
                ).map((marca) => {
                  return (
                    <div className={styles.link} key={marca}>
                      <input
                        onChange={handleOnCheckbox}
                        className={styles.filter_checkbox}
                        type="checkbox"
                        name="marca"
                        id={marca}
                        value={marca}
                      />
                      <label
                        className={styles.filter_subcategory}
                        htmlFor={marca}
                      >
                        {marca}
                      </label>
                    </div>
                  );
                })
                // O codigo acima passa o array resultande do reduce de marcas para a funcao sortValues que ordena os valores do array por ordem alfabetica ou numerica
              }
            </div>
          </>
        );
        break;
    }
  };

  return <>{filtersToReturn()}</>;
}

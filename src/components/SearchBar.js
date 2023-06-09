import React, { useContext } from "react";
import styles from "../styles/SearchBar.module.css";
import { SearchContext } from "../context/SearchContext";

export default function Search() {
  const { search, getSearchValue } = useContext(SearchContext);
  return (
    <>
      <input
        className={styles.search}
        type="text"
        placeholder="Digite o que deseja"
        value={search}
        onChange={getSearchValue}
      />
    </>
  );
}

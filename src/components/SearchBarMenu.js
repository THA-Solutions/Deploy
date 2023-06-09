import React, { useContext } from "react";
import styles from "../styles/SearchBarMenu.module.css";
import { SearchContext } from "../context/SearchContext";

export default function SearchMenu() {
  const { search, getSearchValue } = useContext(SearchContext);
  return (
    <>
      <input
        className={styles.search_menu}
        type="text"
        placeholder="Digite o que deseja"
        value={search}
        onChange={getSearchValue}
      />
    </>
  );
}

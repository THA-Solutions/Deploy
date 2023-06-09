import { createContext, useState } from "react";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [search, setSearch] = useState("");

  const getSearchValue = (e) => {
    setSearch(e.target.value);
  };

  return (
    <SearchContext.Provider value={{ search, getSearchValue }}>
      {children}
    </SearchContext.Provider>
  );
};

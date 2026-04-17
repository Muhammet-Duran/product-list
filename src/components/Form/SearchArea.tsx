import React from "react";
import styles from "./SearchArea.module.scss";
import { useProductContext } from "../../contexts/ProductContext";

const SearchArea: React.FC = () => {
  const { onSearchValue, searchInput } = useProductContext();

  return (
    <div className={styles.search_area}>
      <input
        onChange={onSearchValue}
        value={searchInput}
        type="search"
        className={styles.search_area__input}
        placeholder="everything you are looking for is here"
      />
    </div>
  );
};

export default SearchArea;
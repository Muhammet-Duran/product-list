import React from "react";
import styles from "./SearchArea.module.scss";
import { getSearchProduct } from "../../api/getSearchProduct";
import { useProductContext } from "./../../contexts/ProductContext";

function SearchArea() {
  const { products, setProducts } = useProductContext();
  const onChangeValue = async (e) => {
    e.preventDefault();
    const searchTerm = e.target.value;
    if (searchTerm.trim().length > 0) {
      const getSearchList = async () => {
        const data = await getSearchProduct(searchTerm);
        setProducts(data);
      };
      getSearchList();
    }
    // setProducts(products);
  };

  return (
    <div className={styles.search_area}>
      <input
        onChange={onChangeValue}
        type="search"
        className={styles.search_area__input}
        placeholder="everything you are looking for is here"
      />
    </div>
  );
}

export default SearchArea;

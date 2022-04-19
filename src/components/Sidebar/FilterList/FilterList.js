import React from "react";
import styles from "./FilterList.module.scss";
import Button from "../../Button/Button";
import { useProductContext } from "../../../contexts/ProductContext";
const FilterList = ({ filterTitle }) => {
  const {handleFilter} = useProductContext();
  return (
    <ul className={styles.list}>
      {filterTitle?.map((title, index) => (
        <li key={index} className={styles.list__item}>
          <Button preferences="filter_btn" classNames={styles.btn_filter} onClick={()=>handleFilter(title)}>
            {title}
          </Button>
        </li>
      ))}
    </ul>
  );
};

export default FilterList;

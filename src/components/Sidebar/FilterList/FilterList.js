import React from "react";
import styles from "./FilterList.module.scss";
import Button from "../../Button/Button";
const FilterList = () => {
  return (
    <ul className={styles.list}>
      <li className={styles.list__item}>
        <Button preferences="filter_btn" classNames={styles.btn_filter}>
          Notebook
        </Button>
      </li>
      <li className={styles.list__item}>
        <Button preferences="filter_btn" classNames={styles.btn_filter}>
          Phone
        </Button>
      </li>
      <li className={styles.list__item}>
        <Button preferences="filter_btn" classNames={styles.btn_filter}>
          Headset
        </Button>
      </li>
    </ul>
  );
};

export default FilterList;

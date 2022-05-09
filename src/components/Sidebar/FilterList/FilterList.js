import { useState } from "react";
import styles from "./FilterList.module.scss";
import Button from "../../Button/Button";
// import { useProductContext } from "../../../contexts/ProductContext";
const FilterList = ({ filterTitle }) => {
  // const { allFilterProducts } = useProductContext();
  // const [selectedCategories, setselectedCategories] = useState({
  //   category: [],
  //   color: [],
  //   brand: [],
  // });
  const [isSelected, setIsSelected] = useState(false);
  const handleFilterClick = () => {
    setIsSelected(!isSelected);
  };

  return (
    <Button
      classNames={`${styles.btn_filter} ${isSelected ? styles.active : " "}`}
      onClick={handleFilterClick}
      preferences="filter_btn"
      // classNames={styles.btn_filter}
    >
      {filterTitle}
    </Button>
  );
};

export default FilterList;

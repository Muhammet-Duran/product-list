import { useState, useEffect } from "react";

import Button from "../../Button/Button";
import { useProductContext } from "../../../contexts/ProductContext";

import styles from "./FilterList.module.scss";

const FilterList = ({ filterTitle, categories }) => {
  const { getProducts, selectedCategories, setselectedCategories } =
    useProductContext();
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    setIsSelected(!isSelected);
  };

  const handleFilter = (filterName) => {
    const { category, color, brand } = categories;
    if (isSelected) {
      if (category.includes(filterName)) {
        setselectedCategories({
          ...selectedCategories,
          category: [...selectedCategories.category, filterName],
        });
      }

      if (color.includes(filterName)) {
        setselectedCategories({
          ...selectedCategories,
          color: [...selectedCategories.color, filterName],
        });
      }

      if (brand.includes(filterName)) {
        setselectedCategories({
          ...selectedCategories,
          brand: [...selectedCategories.brand, filterName],
        });
      }
    } else {
      //if unchecked => filter out selected category
      if (category.includes(filterName)) {
        setselectedCategories({
          ...selectedCategories,
          category: selectedCategories.category.filter(
            (item) => item !== filterName
          ),
        });
      }
      //if unchecked => filter out selected color
      if (color.includes(filterName)) {
        setselectedCategories({
          ...selectedCategories,
          color: selectedCategories.color.filter((item) => item !== filterName),
        });
      }
      //if unchecked => filter out selected brand
      if (brand.includes(filterName)) {
        setselectedCategories({
          ...selectedCategories,
          brand: selectedCategories.brand.filter((item) => item !== filterName),
        });
      }
    }
    getProducts();
  };

  useEffect(() => {
    handleFilter(filterTitle);
  }, [isSelected]);

  return (
    <Button
      classNames={`${styles.btn_filter} ${isSelected ? styles.active : " "}`}
      onClick={handleClick}
      preferences="filter_btn"
    >
      {filterTitle}
    </Button>
  );
};

export default FilterList;

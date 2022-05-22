import { useState, useEffect } from "react";

import Button from "../../Button/Button";
import { useProductContext } from "../../../contexts/ProductContext";

import styles from "./FilterList.module.scss";

const FilterList = ({ filterTitle, categories }) => {
  const {
    getProducts,
    selectedCategories,
    setselectedCategories,
    // isActive,
    // setIsActive,
  } = useProductContext();
  const [isSelected, setIsSelected] = useState(false);
  // const [selectedItem, setSelectedItem] = useState('');

  const handleClick = () => {
    setIsSelected(!isSelected);
    // setIsActive(!isActive);
    // isActive && setIsSelected(true);
  };

  const handleFilter = (filterName) => {
    const { category, color, brand } = categories;
    if (isSelected) {
      if (category.includes(filterName)) {
        // setSelectedItem(filterName);
        setselectedCategories({
          ...selectedCategories,
          category: [...selectedCategories.category, filterName],
        });
        return;
      }

      if (color.includes(filterName)) {
        // setSelectedItem(filterName);
        setselectedCategories({
          ...selectedCategories,
          color: [...selectedCategories.color, filterName],
        });
        return;
      }

      if (brand.includes(filterName)) {
        // setSelectedItem(filterName);
        setselectedCategories({
          ...selectedCategories,
          brand: [...selectedCategories.brand, filterName],
        });
        return;
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
        return;
      }
      //if unchecked => filter out selected color
      if (color.includes(filterName)) {
        setselectedCategories({
          ...selectedCategories,
          color: selectedCategories.color.filter((item) => item !== filterName),
        });
        return;
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
      id={filterTitle}
    >
      {filterTitle}
    </Button>
  );
};

export default FilterList;

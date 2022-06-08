import {useEffect } from "react";

import Button from "../../Button/Button";
import { useProductContext } from "../../../contexts/ProductContext";

import styles from "./FilterList.module.scss";

const FilterList = ({ filterTitle, categories, active
  }) => {
    
  
  const {
    getProducts,
    selectedCategories,
    setselectedCategories,
    handleActiveTitle
  } = useProductContext();
  

  const handleFilter = (filterName) => {
    const { category, color, brand } = categories;
    if (active) {
      if (category.some(el=>el.title === filterName)) {
      
        setselectedCategories({
          ...selectedCategories,
          category: [...selectedCategories.category, filterName],
        });
        return;
      }

      if (color.some(el=>el.title === filterName)) {
        setselectedCategories({
          ...selectedCategories,
          color: [...selectedCategories.color, filterName],
        });
        return;
      }

      if (brand.some(el=>el.title === filterName)) {
        setselectedCategories({
          ...selectedCategories,
          brand: [...selectedCategories.brand, filterName],
        });
        return;
      }
    } else {
      //if unchecked => filter out selected category
      if (category.some(el=>el.title === filterName)) {
        setselectedCategories({
          ...selectedCategories,
          category: selectedCategories.category.filter(
            (item) => item !== filterName
          ),
        });
        return;
      }
      //if unchecked => filter out selected color
      if (color.some(el=>el.title === filterName)) {
        setselectedCategories({
          ...selectedCategories,
          color: selectedCategories.color.filter((item) => item !== filterName),
        });
        return;
      }
      //if unchecked => filter out selected brand
      if (brand.some(el=>el.title === filterName)) {
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
    
  }, [active]);

  return (
    <Button
      classNames={`${styles.btn_filter} ${active ? styles.active : " "}`}
      onClick={()=>handleActiveTitle(filterTitle)}
      preferences="filter_btn"
    >
      {filterTitle}
    </Button>
  );
};

export default FilterList;

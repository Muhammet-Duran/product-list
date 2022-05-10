import { useState } from "react";
import styles from "./FilterList.module.scss";
import Button from "../../Button/Button";
import { generateLink } from "../../../Helpers/generateLink";
import { useProductContext } from "../../../contexts/ProductContext";
const FilterList = ({ filterTitle, categories }) => {
  const { getProducts } = useProductContext();
  const [isSelected, setIsSelected] = useState(false);
  const [selectedCategories, setselectedCategories] = useState({
    category: [],
    color: [],
    brand: [],
  });

  const { category, color, brand } = selectedCategories;
  generateLink(category, color, brand);

  const handleFilterClick = (name) => {
    setIsSelected(!isSelected);
    // console.log(isSelected, "sadsa");
    const filterName = name;
    // const checked = isSelected;
    // console.log(checked);

    const { category, color, brand } = categories;
    if (isSelected) {
      // console.log("cek oldu");
      //check if filterName is from  category type
      if (category.includes(filterName)) {
        setselectedCategories({
          ...selectedCategories,
          category: [...selectedCategories.category, filterName],
        });
      }
      //check if filterName is from color category type
      if (color.includes(filterName)) {
        setselectedCategories({
          ...selectedCategories,
          color: [...selectedCategories.color, filterName],
        });
      }
      //check if filterName is from brand category type
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

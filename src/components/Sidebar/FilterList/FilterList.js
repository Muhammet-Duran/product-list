import { useState, useEffect } from "react";
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
  // const handleFilterClick = () => {
  //   setIsSelected(!isSelected);
  //   console.log(isSelected);
  // };

  const handleFilterClick = (name) => {
    const checked = setIsSelected(!isSelected);

    const filterName = name;
    console.log(filterName);
    const { category, color, brand } = categories;
    if (checked) {
      console.log("isSelectedİF", isSelected);
      //check if filterName is from  category type
      if (category.includes(filterName)) {
        console.log("category");
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
      console.log("isSelectedELSE", isSelected);
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
    console.log(selectedCategories);
  };
  // useEffect(() => {
  //   handleFilterClick();
  // }, [selectedCategories]);

  return (
    <Button
      classNames={`${styles.btn_filter} ${isSelected ? styles.active : " "}`}
      onClick={() => handleFilterClick(filterTitle)}
      preferences="filter_btn"
    >
      {filterTitle}
    </Button>
  );
};

export default FilterList;

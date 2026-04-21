import React, { useEffect } from "react";
import Button from "../../Button/Button";
import { useProductContext } from "../../../contexts/ProductContext";
import { FilterListProps } from "../../../types";
import styles from "./FilterList.module.scss";

const FilterList: React.FC<FilterListProps> = ({
  filterTitle,
  categories,
  active = false,
}) => {
  const {
    getProducts,
    selectedCategories,
    setselectedCategories,
    handleActiveTitle,
  } = useProductContext();

  const handleFilter = (filterName: string): void => {
    const { category, color, brand } = categories;

    // Find which type this filter belongs to
    let filterType: "category" | "color" | "brand" | null = null;

    if (category.some((el) => el.title === filterName)) {
      filterType = "category";
    } else if (color.some((el) => el.title === filterName)) {
      filterType = "color";
    } else if (brand.some((el) => el.title === filterName)) {
      filterType = "brand";
    }

    if (!filterType) return;

    // Update selected categories
    const currentList = selectedCategories[filterType];
    const updatedList = active
      ? [...currentList, filterName] // Add if active
      : currentList.filter((item) => item !== filterName); // Remove if not active

    setselectedCategories({
      ...selectedCategories,
      [filterType]: updatedList,
    });

    getProducts();
  };

  useEffect(() => {
    handleFilter(filterTitle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  return (
    <Button
      classNames={`${styles.btn_filter} ${active ? styles.active : ""}`}
      onClick={() => handleActiveTitle(filterTitle)}
      preferences="filter_btn"
    >
      {filterTitle}
    </Button>
  );
};

export default FilterList;

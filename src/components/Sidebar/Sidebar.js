import React from "react";
import FilterList from "./FilterList/FilterList";
import { useProductContext } from "../../contexts/ProductContext";
import { filterCategory } from "../Helpers/filterCategory";
import styles from "./Sidebar.module.scss";
const Sidebar = () => {
  const { products } = useProductContext();

  const categoryList = products.map((product) => product.category);
  const colorList = products.map((product) => product.color);
  const brandList = products.map((product) => product.brand);

  const categoryArr = filterCategory(categoryList);
  const colorArr = filterCategory(colorList);
  const brandArr = filterCategory(brandList);

  return (
    <div className={styles.sidebar}>
      <h2 className={styles.sidebar__filter_title}>Category</h2>
      <FilterList filterTitle={categoryArr} />
      <h2 className={styles.sidebar__filter_title}>Color</h2>
      <FilterList filterTitle={colorArr} />
      <h2 className={styles.sidebar__filter_title}>Brand</h2>
      <FilterList filterTitle={brandArr} />
    </div>
  );
};

export default Sidebar;

import React from "react";
import cn from "classnames";
import FilterList from "./FilterList/FilterList";
import { useProductContext } from "../../contexts/ProductContext";
import { filterCategory } from "./../../Helpers/filterCategory";
import styles from "./Sidebar.module.scss";
const Sidebar = () => {
  const { products, openFilter } = useProductContext();

  const categoryList = products.map((product) => product.category);
  const colorList = products.map((product) => product.color);
  const brandList = products.map((product) => product.brand);
  const filterCategories = filterCategory(categoryList);
  const filterColor = filterCategory(colorList);
  const filterBrand = filterCategory(brandList);

  const filterList = () => {
    const filterTitle = ["Category", "Color", "Brand"];
    const filterValues = [filterCategories, filterColor, filterBrand];
    const newFilterArr = [];
    let i;
    for (i = 0; i < 3; i++) {
      newFilterArr[i] = [filterTitle[i], filterValues[i]];
    }
    return newFilterArr;
  };
  const filterArr = filterList();
  return (
    <div className={cn(styles.sidebar, `${openFilter && styles?.["show"]}`)}>
      <div className={styles.sidebar__inner}>
        {filterArr?.map((item, index) => (
          <div key={index}>
            <h2 className={styles.sidebar__filter_title}>{item[0]}</h2>
            <FilterList filterTitle={item[1]} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

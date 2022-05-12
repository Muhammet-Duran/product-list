import React from "react";
import cn from "classnames";
import FilterList from "./FilterList/FilterList";
import { useProductContext } from "../../contexts/ProductContext";
import { filterCategory } from "./../../helpers/filterCategory";
import styles from "./Sidebar.module.scss";
const Sidebar = () => {
  const { products, openFilter } = useProductContext();

  const categoryList = products.map((product) => product.category);
  const colorList = products.map((product) => product.color);
  const brandList = products.map((product) => product.brand);
  const filterCategories = filterCategory(categoryList);
  const filterColors = filterCategory(colorList);
  const filterBrands = filterCategory(brandList);
  const categories = {
    category: filterCategories,
    color: filterColors,
    brand: filterBrands,
  };

  const filterList = () => {
    const filterTitle = ["Category", "Color", "Brand"];
    const filterValues = [filterCategories, filterColors, filterBrands];
    const newFilterArr = [];

    for (let i = 0; i < 3; i++) {
      newFilterArr[i] = [filterTitle[i], filterValues[i]];
    }
    return newFilterArr;
  };

  return (
    <div className={cn(styles.sidebar, `${openFilter && styles?.["show"]}`)}>
      <div className={styles.sidebar__inner}>
        {filterList()?.map((item, index) => (
          <div key={index} className={styles.tab_area}>
            <h2 className={styles.sidebar__filter_title}>{item[0]}</h2>
            {item[1]?.map((filterTitle, i) => (
              <FilterList
                key={i}
                filterTitle={filterTitle}
                categories={categories}
              />
            ))}
            {/* <FilterList filterTitle={item[1]} /> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

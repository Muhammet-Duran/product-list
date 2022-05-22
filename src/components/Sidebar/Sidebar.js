import { useEffect } from "react";
import cn from "classnames";
import FilterList from "./FilterList/FilterList";
import { useProductContext } from "../../contexts/ProductContext";
import styles from "./Sidebar.module.scss";
import useWindowSize from "../../hooks/useWindowSize";

const Sidebar = () => {
  const { openFilter, setOpenFilter } = useProductContext();

  const size = useWindowSize();

  useEffect(() => {
    if (size.width > 991 && openFilter) {
      setOpenFilter(false);
    }
  }, [size, openFilter]);

  const filterCategories = ["headset", "notebook", "phone"];
  const filterColors = [
    "black",
    "blue",
    "gold",
    "cream",
    "white",
    "silver",
    "ivory",
    "pink",
  ];
  const filterBrands = ["Sony", "Jbl", "Samsung", "Huawei", "Asus"];
  const categories = {
    category: filterCategories,
    color: filterColors,
    brand: filterBrands,
  };

  const filterValues = [
    ["Category", filterCategories],
    ["Color", filterColors],
    ["Brand", filterBrands],
  ];

  return (
    <div className={cn(styles.sidebar, `${openFilter && styles?.["show"]}`)}>
      <div className={styles.sidebar__inner}>
        {filterValues?.map((item, index) => (
          <div key={index} className={styles.tab_area}>
            <h2 className={styles.sidebar__filter_title}>{item[0]}</h2>
            {item[1]?.map((filterTitle, i) => (
              <FilterList
                key={i}
                filterTitle={filterTitle}
                categories={categories}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

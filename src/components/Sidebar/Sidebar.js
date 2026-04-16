import { useEffect } from "react";
import cn from "classnames";
import FilterList from "./FilterList/FilterList";
import { useProductContext } from "../../contexts/ProductContext";
import styles from "./Sidebar.module.scss";
import useWindowSize from "../../hooks/useWindowSize";

const Sidebar = () => {
  const { openFilter, setOpenFilter, categories, filterValue, clearAllFilters, selectedCategories} =
    useProductContext();
  const size = useWindowSize();
  
  // Herhangi bir filtre seçili mi kontrol et
  const hasActiveFilters = selectedCategories.category.length > 0 || 
                          selectedCategories.color.length > 0 || 
                          selectedCategories.brand.length > 0;
  
  useEffect(() => {
    if (size.width > 991 && openFilter) {
      setOpenFilter(false);
    }
  }, [size, openFilter, setOpenFilter]);
  return (
    <div className={cn(styles.sidebar, `${openFilter && styles?.["show"]}`)}>
      <div className={styles.sidebar__inner}>
        {hasActiveFilters && (
          <button className={styles.clear_all_btn} onClick={clearAllFilters}>
            Clear All Filters
          </button>
        )}
        {filterValue?.map((item, index) => (
          <div key={index} className={styles.tab_area}>
            <h2 className={styles.sidebar__filter_title}>
              {item.categoryTitle}
            </h2>
            {item.titleArea?.map((filterTitle, i) => (
              <FilterList
                key={i}
                filterTitle={filterTitle.title}
                categories={categories}
                active={filterTitle.active}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

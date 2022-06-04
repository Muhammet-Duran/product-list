import { useEffect } from "react";
import cn from "classnames";
import FilterList from "./FilterList/FilterList";
import { useProductContext } from "../../contexts/ProductContext";
import styles from "./Sidebar.module.scss";
import useWindowSize from "../../hooks/useWindowSize";

const Sidebar = () => {
  const { openFilter, setOpenFilter, categories, filterValue} =
    useProductContext();
  const size = useWindowSize();
  useEffect(() => {
    if (size.width > 991 && openFilter) {
      setOpenFilter(false);
    }
  }, [size, openFilter]);
  return (
    <div className={cn(styles.sidebar, `${openFilter && styles?.["show"]}`)}>
      <div className={styles.sidebar__inner}>
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

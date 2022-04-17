import React from "react";
import FilterList from "./FilterList/FilterList";
import styles from "./Sidebar.module.scss";
const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <h2 className={styles.sidebar__filter_title}>Category</h2>
      <FilterList />
      <h2 className={styles.sidebar__filter_title}>Color</h2>
      <FilterList />
      <h2 className={styles.sidebar__filter_title}>Brand</h2>
      <FilterList />
    </div>
  );
};

export default Sidebar;

import React from "react";
import { useProductContext } from "../../contexts/ProductContext";
import { SortOrder } from "../../types";
import styles from "./SortControl.module.scss";

const SortControl: React.FC = () => {
  const { sortOrder, setSortOrder } = useProductContext();

  const isValidSortOrder = (value: string): value is SortOrder => {
    return [
      "default",
      "price_asc",
      "price_desc",
      "name_asc",
      "name_desc",
    ].includes(value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const value = e.target.value;

    if (isValidSortOrder(value)) {
      setSortOrder(value);
    } else {
      setSortOrder("default");
    }
  };

  return (
    <div className={styles.sort_control}>
      <select
        id="sort-select"
        aria-label="Product sorting options"
        value={sortOrder}
        onChange={handleSortChange}
        className={styles.sort_select}
      >
        <option value="default">Default</option>
        <option value="price_asc">Price: Low to High</option>
        <option value="price_desc">Price: High to Low</option>
        <option value="name_asc">Name: A-Z</option>
        <option value="name_desc">Name: Z-A</option>
      </select>
    </div>
  );
};

export default SortControl;

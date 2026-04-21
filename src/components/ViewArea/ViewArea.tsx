import React, { useState } from "react";
import cn from "classnames";
import { MdFilterListAlt } from "react-icons/md";
import { useProductContext } from "../../contexts/ProductContext";
import SearchArea from "../Form/SearchArea";
import SortControl from "../SortControl/SortControl";
import Button from "../Button/Button";
import { ViewAreaProps } from "../../types";
import styles from "./ViewArea.module.scss";

const ViewArea: React.FC<ViewAreaProps> = ({ handleViewChange }) => {
  const [activeView, setActiveView] = useState<number>(1);
  const { filteredAndSortedProducts, handleMenuToggle } = useProductContext();

  const onClickChange = (column: string, index: number): void => {
    handleViewChange(column);
    setActiveView(index);
  };

  const gridNumber: number[] = [3, 4, 5];

  return (
    <div className={cn("container", styles.options)}>
      <div className={styles.options__bottom}>
        <Button
          onClick={handleMenuToggle}
          preferences="filter_area_btn"
          classNames={styles.options_filter_btn}
        >
          <MdFilterListAlt className={styles.mobile_filter} />
          <span className={styles.filter_text}>FILTERS</span>
        </Button>
        <span className={styles.product_count}>
          RESULTS({filteredAndSortedProducts?.length})
        </span>
      </div>
      <SearchArea />
      <div className={styles.options__sort_area}>
        {gridNumber.map((el, index) => (
          <Button
            key={index}
            onClick={() => onClickChange(`col_${el}`, index)}
            preferences="grid_btn"
            classNames={cn(
              styles.btn_light,
              activeView === index && styles.active
            )}
          >
            {el}
          </Button>
        ))}
        <SortControl />
      </div>
    </div>
  );
};

export default ViewArea;

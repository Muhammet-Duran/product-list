import React, { useState } from "react";
import { useProductContext } from "../../contexts/ProductContext";
import SearchArea from "../Form/SearchArea";
import styles from "./ViewArea.module.scss";
import Button from "../Button/Button";
import { MdFilterListAlt } from "react-icons/md";
import cn from "classnames";

const ViewArea = ({ handleViewChange }) => {
  const [activeView, setActiveView] = useState(1);
  const { products, openFilter, setOpenFilter } = useProductContext();
  const handleMenuToggle = () => {
    setOpenFilter(!openFilter);
    console.log("mrb");
    console.log(openFilter);
  };
  const onClickChange = (column, index) => {
    handleViewChange(column);
    setActiveView(index);
  };

  const gridNumber = [3, 4, 5];

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
          RESULTS({products?.length})
        </span>
      </div>
      <SearchArea />
      <div className={styles.options__sort_area}>
        {gridNumber.map((el, index) => (
          <Button
            key={index}
            onClick={() => onClickChange(`col_${el}`, index)}
            preferences="grid_btn"
            classNames={`${styles.btn_light} ${
              activeView === index ? styles.active : " "
            }`}
          >
            {el}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ViewArea;

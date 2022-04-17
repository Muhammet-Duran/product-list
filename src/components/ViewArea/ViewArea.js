import React, { useState } from "react";
import { useProductContext } from "../../contexts/ProductContext";
import SearchArea from "../Form/SearchArea";
import styles from "./ViewArea.module.scss";
import Button from "../Button/Button";
import cn from "classnames";

const ViewArea = ({ handleViewChange }) => {
  const [activeView, setActiveView] = useState(1);
  const { products } = useProductContext();
  const onClickChange = (column, index) => {
    handleViewChange(column);
    setActiveView(index);
    // const btnState = activeView === index ? styles.active : " ";
  };

  const gridNumber = [3, 4, 5];

  return (
    <div className={cn("container", styles.options)}>
      <p className={styles.options__product_count}>
        RESULTS({products?.length})
      </p>
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

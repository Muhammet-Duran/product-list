import React, { useState, useEffect } from "react";
import Button from "../Button/Button";
import cn from "classnames";
import { GrFormNext } from "react-icons/gr";
import { GrFormPrevious } from "react-icons/gr";
import styles from "./Pagination.module.scss";
const Pagination = ({ pages, setCurrentPage, currentProducts, products }) => {
  const [currentButton, setCurrentButton] = useState(1);
  const numofPages = [];
  for (let i = 1; i <= pages; i++) {
    numofPages.push(i);
  }

  useEffect(() => {
    setCurrentPage(currentButton);
    window.scrollTo(0, 0);
  }, [currentButton, setCurrentPage]);
  return (
    <div className={cn("container", styles.pagination_wrapper)}>
      <div className={styles.pagination}>
        <div className={styles.info_text}>
          {currentProducts?.length} / {products?.length}
        </div>
        <ul className={styles.pagination__list}>
          <li className={styles.pagination__list__item}>
            <Button
              preferences="page_btn"
              className={styles.pagination__list__item__number}
              classNames={` ${styles.btn_pagination} ${
                currentButton === 1 ? styles.disabled : ""
              }`}
              onClick={() => {
                setCurrentButton((prev) => (prev === 1 ? prev : prev - 1));
              }}
            >
              <GrFormPrevious
                className={styles.pagination__list__item__number__page_icon}
              />
            </Button>
          </li>
          {numofPages.map((page, index) => {
            return (
              <li key={index} className={styles.pagination__list__item}>
                <Button
                  preferences="page_btn"
                  className={styles.pagination__list__item__number}
                  classNames={` ${styles.btn_pagination} ${
                    currentButton === page ? styles.active : ""
                  }`}
                  onClick={() => setCurrentButton(page)}
                >
                  {page}
                </Button>
              </li>
            );
          })}
          <li className={styles.pagination__list__item}>
            <Button
              preferences="page_btn"
              className={styles.pagination__list__item__number}
              classNames={` ${styles.btn_pagination} ${
                currentButton === numofPages.length ? styles.disabled : ""
              }`}
              onClick={() =>
                setCurrentButton((prev) =>
                  prev === numofPages.length ? prev : prev + 1
                )
              }
            >
              <GrFormNext
                className={styles.pagination__list__item__number__page_icon}
              />
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Pagination;

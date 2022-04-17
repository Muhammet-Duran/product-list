import React, { Fragment, useState } from "react";
import { useProductContext } from "./../contexts/ProductContext";
import ViewArea from "../components/ViewArea/ViewArea";
import Products from "./../components/Products/Products";
import Sidebar from "../components/Sidebar/Sidebar";
import styles from "./Page.module.scss";

const Home = () => {
  const { products } = useProductContext();

  const [gridView, setGridView] = useState();
  const handleViewChange = (column) => {
    setGridView(column);
  };

  return (
    <Fragment>
      <ViewArea handleViewChange={handleViewChange} />
      <div className={styles.home_body}>
        <Sidebar />
        <Products
          products={products}
          preferences={`${gridView ? gridView : "col_4"}`}
        />
      </div>
    </Fragment>
  );
};

export default Home;

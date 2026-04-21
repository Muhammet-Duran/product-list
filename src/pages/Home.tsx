import React, { Fragment, useState, useEffect } from "react";
import { useProductContext } from "../contexts/ProductContext";
import ViewArea from "../components/ViewArea/ViewArea";
import Products from "../components/Products/Products";
import Sidebar from "../components/Sidebar/Sidebar";
import Pagination from "../components/Pagination/Pagination";
import useWindowSize from "../hooks/useWindowSize";
import { Product } from "../types";
import styles from "./Page.module.scss";

const Home: React.FC = () => {
  const {
    filteredAndSortedProducts,
    searchInput,
    isLoading,
    openFilter,
    handleMenuToggle,
  } = useProductContext();

  const filterList: Product[] =
    filteredAndSortedProducts?.filter((item) =>
      item?.title?.toLowerCase().includes(searchInput.toLowerCase())
    ) || [];

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsPerPage, setProductsPerPage] = useState<number>(12);
  const size = useWindowSize();

  useEffect(() => {
    if (size.width < 990) {
      setProductsPerPage(6);
    } else {
      setProductsPerPage(12);
    }
  }, [size.width]);

  const indexOfLastEmployee = currentPage * productsPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - productsPerPage;
  const currentProducts: Product[] =
    filterList?.slice(indexOfFirstEmployee, indexOfLastEmployee) || [];
  const totalPagesNum = Math.ceil(
    filteredAndSortedProducts?.length / productsPerPage
  );

  const [gridView, setGridView] = useState<string>("");
  const handleViewChange = (column: string): void => {
    setGridView(column);
  };

  // ...

  return (
    <Fragment>
      {openFilter && (
        <div className={styles.overlay} onClick={handleMenuToggle} />
      )}
      <ViewArea handleViewChange={handleViewChange} />
      <div className={styles.home_body}>
        <Sidebar />
        <Products
          products={currentProducts}
          preferences={gridView || "col_4"}
          isLoading={isLoading}
        />
      </div>
      <Pagination
        products={filteredAndSortedProducts}
        pages={totalPagesNum}
        setCurrentPage={setCurrentPage}
        currentProducts={currentProducts}
      />
    </Fragment>
  );
};

export default Home;

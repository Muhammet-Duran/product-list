import React, { Fragment, useState, useEffect} from "react";
import { useProductContext } from "./../contexts/ProductContext";
import ViewArea from "../components/ViewArea/ViewArea";
import Products from "./../components/Products/Products";
import Sidebar from "../components/Sidebar/Sidebar";
import Pagination from "../components/Pagination/Pagination";
import styles from "./Page.module.scss";
import useWindowSize from "../hooks/useWindowSize";

const Home = () => {
  const { products, searchInput } = useProductContext();
  
  const filterList = products?.filter((item) =>
    item.title.toLowerCase().includes(searchInput.toLowerCase())
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(12);
  const size = useWindowSize();
  useEffect(()=>{
    if(size.width <990){
      setProductsPerPage(6);
    }else{
      setProductsPerPage(12);
    }
    
  }, [size,productsPerPage])

  const indexOfLastEmployee = currentPage * productsPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - productsPerPage;
  const currentProducts = filterList?.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );
  const totalPagesNum = Math.ceil(products?.length / productsPerPage);

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
          products={currentProducts}
          preferences={`${gridView ? gridView : "col_4"}`}
        />
      </div>
      <Pagination
        products={products}
        pages={totalPagesNum}
        setCurrentPage={setCurrentPage}
        currentProducts={currentProducts}
      />
    </Fragment>
  );
};

export default Home;

import { createContext, useContext, useState, useEffect } from "react";
import { getProductList } from "../api/productData";
const ProductContext = createContext();

export const ProductContextProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [cartList, setCartList] = useState([]);

  const getProducts = async () => {
    // setIsLoading(true);
    const data = await getProductList();
    setProducts(data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const addToCart = (product) => {
    if (cartList.find((cartItem) => cartItem.productId === product.productId)) {
      const newList = cartList.filter(
        (cartItem) => cartItem.productId !== product.productId
      );
      setCartList(newList);
    } else {
      const newList = [...cartList, product];
      setCartList(newList);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        addToCart,
        cartList,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};
export const useProductContext = () => useContext(ProductContext);

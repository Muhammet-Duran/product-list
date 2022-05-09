import { createContext, useContext, useState, useEffect } from "react";
import { getProductList } from "../api/productData";
import { discountPrice } from "../Helpers/discountPrice";
const ProductContext = createContext();

export const ProductContextProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [cartList, setCartList] = useState([]);
  const [openFilter, setOpenFilter] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  // const [btnActive, setBtnActive] = useState(false);

  const getProducts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getProductList();
      setProducts(data);
    } catch (error) {
      setError("🤔 Oops! Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  //Add to Cart Item
  const addToCart = (product) => {
    if (cartList.find((cartItem) => cartItem.productId === product.productId)) {
      return;
    } else {
      const newList = [...cartList, { ...product, count: 1 }];
      setCartList(newList);
    }
  };

  //Remove to Cart Item
  const removeToCart = (product) => {
    const newList = cartList.filter(
      (item) => item.productId !== product.productId
    );
    setCartList(newList);
  };

  //Increase amount in cart
  const increaseToCart = (product) => {
    const newList = cartList.map((cartItem) =>
      cartItem.productId === product.productId
        ? {
            ...cartItem,
            count:
              cartItem.count === cartItem.quantity
                ? cartItem.quantity
                : cartItem.count + 1,
          }
        : cartItem
    );
    setCartList(newList);
  };

  //Decrease amount in cart
  const decreaseToCart = (product) => {
    const newList = cartList.map((cartItem) =>
      cartItem.productId === product.productId
        ? { ...cartItem, count: cartItem.count > 1 ? cartItem.count - 1 : 1 }
        : cartItem
    );

    setCartList(newList);
  };

  // Total Cart Amount
  const totalCartCost = cartList
    .reduce(
      (total, product) =>
        (total =
          total + parseInt(discountPrice(product)) * parseInt(product.count)),
      0
    )
    .toFixed(2);

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        addToCart,
        cartList,
        increaseToCart,
        decreaseToCart,
        removeToCart,
        totalCartCost,

        openFilter,
        setOpenFilter,
        error,
        isLoading,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};
export const useProductContext = () => useContext(ProductContext);

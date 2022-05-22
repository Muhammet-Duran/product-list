import { createContext, useContext, useState, useEffect } from "react";
import { discountPrice } from "../helpers/discountPrice";
import { generateLink } from "./../helpers/generateLink";
const ProductContext = createContext();

export const ProductContextProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [cartList, setCartList] = useState([]);
  const [openFilter, setOpenFilter] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  // const [isActive, setIsActive] = useState(false);
  const [selectedCategories, setselectedCategories] = useState({
    category: [],
    color: [],
    brand: [],
  });

  const handleMenuToggle = () => {
    setOpenFilter(!openFilter);
  };

  openFilter
    ? (document.body.style.overflow = "hidden")
    : (document.body.style.overflow = "unset");

  const { category, color, brand } = selectedCategories;
  const getProducts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await generateLink(category, color, brand);
      setProducts(data);
    } catch (error) {
      setError("🤔 Oops! Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, [selectedCategories]);

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
        getProducts,
        openFilter,
        setOpenFilter,
        error,
        isLoading,
        generateLink,
        selectedCategories,
        setselectedCategories,
        handleMenuToggle,
        // isActives,
        // setIsActive,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};
export const useProductContext = () => useContext(ProductContext);

import { createContext, useContext, useState, useEffect } from "react";
import { getProductList } from "../api/productData";
import { discountPrice } from "../components/Helpers/discountPrice";
const ProductContext = createContext();

export const ProductContextProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [cartList, setCartList] = useState([]);
  // const [btnActive, setBtnActive] = useState(false);
  // console.log(products);
  const getProducts = async () => {
    const data = await getProductList();
    setProducts(data);
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

  //Sidebar Filter
  // const handleCategoryFilter = (title)=> {
  //   const filterList = products.filter((product)=>product.category === title);
  //   setProducts(filterList)
  // }
  // const handleColorFilter = (title)=> {
  //   const filterList = products.filter((product)=>product.color === title);
  //   setProducts(filterList)
  // }
  // const handleBrandFilter = (title)=> {
  //   const filterList = products.filter((product)=>product.brand === title);
  //   setProducts(filterList)
  // }

  // const allFilterProducts = ()=>{
  //   const allFilter = handleCategoryFilter() || handleColorFilter() || handleBrandFilter();
  //   setProducts(allFilter);
  // }
  const allFilterProducts = (title)=>{
   const filterProduct = products.filter((product)=>product.category === title) || products.filter((product)=>product.color === title) || products.filter((product)=>product.brand === title);
  //  const filterProduct = products.filter((product)=>product.category === title);
    setProducts(filterProduct);
  }

  // Total Cart Amount
  const totalCartCost = cartList
    .reduce(
      (total, product) => (total = total + parseInt(discountPrice(product)) * parseInt(product.count)),
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
        allFilterProducts
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};
export const useProductContext = () => useContext(ProductContext);

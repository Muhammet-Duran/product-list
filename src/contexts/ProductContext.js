import { createContext, useContext, useState, useEffect } from "react";


import { discountPrice } from "../helpers/discountPrice";
import { generateLink } from "./../helpers/generateLink";
const ProductContext = createContext();

export const ProductContextProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [cartList, setCartList] = useState([]);
  const [openFilter, setOpenFilter] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null)
  const [searchInput, setSearchInput] = useState('');

  
  const [selectedCategories, setselectedCategories] = useState({
    category: [],
    color: [],
    brand: [],
  });

  const filterCategories = [{title:"headset"}, {title:"notebook"}, {title:"phone"}];
  const filterColors = [{title:"black"},{title:"blue"},{title: "gold"},{title:"cream"},{title:"white"},{title:"silver"},{title:"ivory"},{title:"pink"}];
  const filterBrands = [{title:"Sony"}, {title:"Jbl"}, {title:"Samsung"}, {title:"Huawei"}, {title:"Asus"}];
  const categories = {
    category: filterCategories,
    color: filterColors,
    brand: filterBrands,
  };

  const filterValues = [
    { categoryTitle: "Category", titleArea: filterCategories },
    { categoryTitle: "Color", titleArea: filterColors },
    { categoryTitle: "Brand", titleArea: filterBrands }
  ];

  const [filterValue, setFilterValue] = useState(filterValues);

  const handleActiveTitle = (title) => {
    const newList = filterValue?.map((item)=>({...item, titleArea:item.titleArea.map(el=>el.title === title ?{...el, active : !el.active} :el)}))
    setFilterValue(newList)
  
  };


  const onSearchValue = (e) => {
    setSearchInput(e.target.value);

  };
  
  

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

  useEffect(() => {
    const savedCartList = JSON.parse(localStorage.getItem("myCartList"));
    if (savedCartList) {
      setCartList(savedCartList);
    }
  }, []);

  useEffect(() => {
    
    localStorage.setItem("myCartList", JSON.stringify(cartList));
  }, [cartList.length]);

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
        categories,
        filterValue,
        handleActiveTitle,
        searchInput,
        onSearchValue
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};
export const useProductContext = () => useContext(ProductContext);

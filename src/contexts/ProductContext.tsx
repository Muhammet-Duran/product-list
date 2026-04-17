import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { discountPrice } from "../Helpers/discountPrice";
import { generateLink } from "../Helpers/generateLink";
import {
  Product,
  CartItem,
  FilterCategory,
  FilterOption,
  SelectedCategories,
  FilterCategories,
  ProductContextValue,
} from "../types";

const ProductContext = createContext<ProductContextValue | undefined>(
  undefined,
);

interface ProductContextProviderProps {
  children: ReactNode;
}

export const ProductContextProvider = ({
  children,
}: ProductContextProviderProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cartList, setCartList] = useState<CartItem[]>([]);
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState<string>("");

  const [selectedCategories, setselectedCategories] =
    useState<SelectedCategories>({
      category: [],
      color: [],
      brand: [],
    });

  const filterCategories: FilterOption[] = [
    { title: "headset" },
    { title: "notebook" },
    { title: "phone" },
  ];

  const filterColors: FilterOption[] = [
    { title: "black" },
    { title: "blue" },
    { title: "gold" },
    { title: "cream" },
    { title: "white" },
    { title: "silver" },
    { title: "ivory" },
    { title: "pink" },
  ];

  const filterBrands: FilterOption[] = [
    { title: "Sony" },
    { title: "Jbl" },
    { title: "Samsung" },
    { title: "Huawei" },
    { title: "Asus" },
  ];

  const categories: FilterCategories = {
    category: filterCategories,
    color: filterColors,
    brand: filterBrands,
  };

  const filterValues: FilterCategory[] = [
    { categoryTitle: "Category", titleArea: filterCategories },
    { categoryTitle: "Color", titleArea: filterColors },
    { categoryTitle: "Brand", titleArea: filterBrands },
  ];

  const [filterValue, setFilterValue] =
    useState<FilterCategory[]>(filterValues);

  const clearAllFilters = (): void => {
    setselectedCategories({
      category: [],
      color: [],
      brand: [],
    });

    const resetFilters = filterValues.map((item) => ({
      ...item,
      titleArea: item.titleArea.map((el) => ({ ...el, active: false })),
    }));
    setFilterValue(resetFilters);
  };

  const handleActiveTitle = (title: string): void => {
    const newList = filterValue?.map((item) => ({
      ...item,
      titleArea: item.titleArea.map((el) =>
        el.title === title ? { ...el, active: !el.active } : el,
      ),
    }));
    setFilterValue(newList);
  };

  const onSearchValue = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchInput(e.target.value);
  };

  const handleMenuToggle = (): void => {
    setOpenFilter(!openFilter);
  };

  openFilter
    ? (document.body.style.overflow = "hidden")
    : (document.body.style.overflow = "unset");

  const { category, color, brand } = selectedCategories;

  const getProducts = async (): Promise<void> => {
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

  // İlk yüklemede ürünleri getir
  useEffect(() => {
    if (products.length === 0) {
      getProducts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Kategori/filtre değişince ürünleri getir
  useEffect(() => {
    if (products.length > 0) {
      getProducts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategories]);

  // Add to Cart Item
  const addToCart = (product: Product): void => {
    if (cartList.find((cartItem) => cartItem.productId === product.productId)) {
      return;
    } else {
      const newList: CartItem[] = [...cartList, { ...product, count: 1 }];
      setCartList(newList);
    }
  };

  useEffect(() => {
    const savedCartList = localStorage.getItem("myCartList");
    if (savedCartList) {
      setCartList(JSON.parse(savedCartList));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("myCartList", JSON.stringify(cartList));
  }, [cartList]);

  // Remove to Cart Item
  const removeToCart = (product: CartItem): void => {
    const newList = cartList.filter(
      (item) => item.productId !== product.productId,
    );
    setCartList(newList);
  };

  // Increase amount in cart
  const increaseToCart = (product: CartItem): void => {
    const newList = cartList.map((cartItem) =>
      cartItem.productId === product.productId
        ? {
            ...cartItem,
            count:
              cartItem.count === cartItem.quantity
                ? cartItem.quantity
                : cartItem.count + 1,
          }
        : cartItem,
    );
    setCartList(newList);
  };

  // Decrease amount in cart
  const decreaseToCart = (product: CartItem): void => {
    const newList = cartList.map((cartItem) =>
      cartItem.productId === product.productId
        ? { ...cartItem, count: cartItem.count > 1 ? cartItem.count - 1 : 1 }
        : cartItem,
    );
    setCartList(newList);
  };

  // Total Cart Amount
  const totalCartCost: string = cartList
    .reduce(
      (total, product) => total + discountPrice(product) * product.count,
      0,
    )
    .toFixed(2);

  const value: ProductContextValue = {
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
    clearAllFilters,
    searchInput,
    onSearchValue,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

export const useProductContext = (): ProductContextValue => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error(
      "useProductContext must be used within a ProductContextProvider",
    );
  }
  return context;
};

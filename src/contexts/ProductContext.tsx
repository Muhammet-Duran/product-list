import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { generateLink } from "../Helpers/generateLink";
import {
  Product,
  SelectedCategories,
  ProductContextValue,
  SortOrder,
  FilterCategory,
} from "../types";
import { useCart } from "../hooks/useCart";
import { useProductFiltering } from "../hooks/useProductFiltering";
import { CATEGORIES, INITIAL_FILTER_VALUES } from "../constants/filterOptions";

const ProductContext = createContext<ProductContextValue | undefined>(
  undefined
);

interface ProductContextProviderProps {
  children: ReactNode;
}

export const ProductContextProvider = ({
  children,
}: ProductContextProviderProps) => {
  // Product state
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Filter state
  const [selectedCategories, setselectedCategories] =
    useState<SelectedCategories>({
      category: [],
      color: [],
      brand: [],
    });
  const [filterValue, setFilterValue] = useState<FilterCategory[]>(
    INITIAL_FILTER_VALUES
  );
  const [openFilter, setOpenFilter] = useState<boolean>(false);

  // Search and sort state
  const [searchInput, setSearchInput] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("default");

  // Read sort from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlSort = params.get("sort");
    if (
      urlSort &&
      ["default", "price_asc", "price_desc", "name_asc", "name_desc"].includes(
        urlSort
      )
    ) {
      setSortOrder(urlSort as SortOrder);
    }
  }, []);

  // Update URL when sort changes
  useEffect(() => {
    const url = new URL(window.location.href);
    if (sortOrder === "default") {
      url.searchParams.delete("sort");
    } else {
      url.searchParams.set("sort", sortOrder);
    }
    window.history.replaceState({}, "", url);
  }, [sortOrder]);

  // Custom hooks
  const {
    cartList,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    totalCartCost,
  } = useCart();

  const filteredAndSortedProducts = useProductFiltering(
    products,
    selectedCategories,
    sortOrder
  );

  // Update filterValue when INITIAL_FILTER_VALUES changes
  useEffect(() => {
    setFilterValue(INITIAL_FILTER_VALUES);
  }, []);

  // Filter handlers
  const clearAllFilters = (): void => {
    setselectedCategories({
      category: [],
      color: [],
      brand: [],
    });

    const resetFilters = INITIAL_FILTER_VALUES.map((item) => ({
      ...item,
      titleArea: item.titleArea.map((el) => ({ ...el, active: false })),
    }));
    setFilterValue(resetFilters);
  };

  const handleActiveTitle = (title: string): void => {
    const newList = filterValue?.map((item) => ({
      ...item,
      titleArea: item.titleArea.map((el) =>
        el.title === title ? { ...el, active: !el.active } : el
      ),
    }));
    setFilterValue(newList);
  };

  // UI handlers
  const onSearchValue = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchInput(e.target.value);
  };

  const handleMenuToggle = (): void => {
    setOpenFilter(!openFilter);
  };

  // Body overflow control for mobile filter
  useEffect(() => {
    document.body.style.overflow = openFilter ? "hidden" : "unset";
  }, [openFilter]);

  // Product fetching
  const getProducts = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      const { category, color, brand } = selectedCategories;
      const data = await generateLink(category, color, brand);
      setProducts(data);
    } catch (error) {
      setError("🤔 Oops! Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  // Initial product load
  useEffect(() => {
    if (products.length === 0) {
      getProducts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Reload products when filters change
  useEffect(() => {
    if (products.length > 0) {
      getProducts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategories]);

  const value: ProductContextValue = {
    // Product data
    products,
    setProducts,
    isLoading,
    error,
    getProducts,
    generateLink,

    // Cart
    cartList,
    addToCart,
    increaseToCart: increaseQuantity,
    decreaseToCart: decreaseQuantity,
    removeToCart: removeFromCart,
    totalCartCost,

    // Filters
    selectedCategories,
    setselectedCategories,
    categories: CATEGORIES,
    filterValue,
    handleActiveTitle,
    clearAllFilters,
    openFilter,
    setOpenFilter,
    handleMenuToggle,

    // Search and sort
    searchInput,
    onSearchValue,
    sortOrder,
    setSortOrder,
    filteredAndSortedProducts,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

export const useProductContext = (): ProductContextValue => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error(
      "useProductContext must be used within a ProductContextProvider"
    );
  }
  return context;
};

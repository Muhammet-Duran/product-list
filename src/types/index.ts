// ============================================
// Filter & Sort Types
// ============================================

// Order by price and name: default, price ascending/descending, name ascending/descending
export type SortOrder =
  | "default"
  | "price_asc"
  | "price_desc"
  | "name_asc"
  | "name_desc";

// Selected category type for filtering
export type SelectedCategory = string | null;

// ============================================
// Product Types
// ============================================

export interface Product {
  productId: string;
  title: string;
  brand: string;
  category: ProductCategory;
  color: ProductColor;
  price: string;
  discount: number;
  imgUrl: string;
  quantity: number;
}

export type ProductCategory = "headset" | "notebook" | "phone";

export type ProductColor =
  | "black"
  | "blue"
  | "gold"
  | "cream"
  | "white"
  | "silver"
  | "ivory"
  | "pink";

export type ProductBrand =
  | "Sony"
  | "Jbl"
  | "Samsung"
  | "Huawei"
  | "Asus"
  | "Apple";

// ============================================
// Cart Types
// ============================================

export interface CartItem extends Product {
  count: number;
}

// ============================================
// Filter Types
// ============================================

export interface FilterOption {
  title: string;
  active?: boolean;
}

export interface FilterCategory {
  categoryTitle: string;
  titleArea: FilterOption[];
}

export interface SelectedCategories {
  category: string[];
  color: string[];
  brand: string[];
}

export interface FilterCategories {
  category: FilterOption[];
  color: FilterOption[];
  brand: FilterOption[];
}

// ============================================
// Context Types
// ============================================

export interface ProductContextValue {
  // State
  products: Product[];
  cartList: CartItem[];
  openFilter: boolean;
  isLoading: boolean;
  error: string | null;
  searchInput: string;
  selectedCategories: SelectedCategories;
  filterValue: FilterCategory[];
  categories: FilterCategories;
  totalCartCost: string;
  // Filtre & Sıralama
  sortOrder: SortOrder;
  setSortOrder: (order: SortOrder) => void;
  filteredAndSortedProducts: Product[];

  // Actions
  setProducts: (products: Product[]) => void;
  addToCart: (product: Product) => void;
  increaseToCart: (product: CartItem) => void;
  decreaseToCart: (product: CartItem) => void;
  removeToCart: (product: CartItem) => void;
  getProducts: () => Promise<void>;
  setOpenFilter: (open: boolean) => void;
  generateLink: (
    category: string[],
    color: string[],
    brand: string[]
  ) => Promise<Product[]>;
  setselectedCategories: (categories: SelectedCategories) => void;
  handleMenuToggle: () => void;
  handleActiveTitle: (title: string) => void;
  clearAllFilters: () => void;
  onSearchValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// ============================================
// API Types
// ============================================

export interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
}

export interface ProductsApiResponse {
  products: Product[];
}

// ============================================
// Component Props Types
// ============================================

export interface ProductCardProps {
  product: Product;
}

export interface CartBtnAreaProps {
  product: Product | CartItem;
}

export interface FilterListProps {
  filterTitle: string;
  categories: FilterCategories;
  active?: boolean;
}

export interface PaginationProps {
  products: Product[];
  pages: number;
  setCurrentPage: (page: number) => void;
  currentProducts: Product[];
}

export interface ProductsProps {
  products: Product[];
  preferences: string;
}

export interface ViewAreaProps {
  handleViewChange: (column: string) => void;
}

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
  className?: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

// ============================================
// Utility Types
// ============================================

export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;

export type AsyncFunction<T = void> = () => Promise<T>;

export type EventHandler<T = HTMLElement> = (
  event: React.ChangeEvent<T>
) => void;

/**
 * API-specific Type Definitions
 */

import { Product } from "./index";

// ============================================
// Request Types
// ============================================

export interface GetProductsParams {
  category?: string[];
  color?: string[];
  brand?: string[];
}

export type FilterQueryString = string;

// ============================================
// Response Types
// ============================================

export interface ProductListResponse {
  products: Product[];
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

// ============================================
// Axios Config Types
// ============================================

export interface ApiConfig {
  baseURL: string;
  headers: Record<string, string>;
  timeout?: number;
}

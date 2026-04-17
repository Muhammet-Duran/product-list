/**
 * Custom Hooks Type Definitions
 */

// ============================================
// Window Size Hook
// ============================================

export interface WindowSize {
  width: number;
  height: number;
}

export type UseWindowSizeReturn = WindowSize;

// ============================================
// Local Storage Hook
// ============================================

export type UseLocalStorageReturn<T> = [
  T,
  (value: T) => void,
  () => void
];

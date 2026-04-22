import { CartItem, Product } from "./index";

// Chat message types
export interface ChatMessage {
  id: number;
  role: "user" | "assistant";
  text: string;
  timestamp: string;
}

// Chat context types
export interface ChatContextValue {
  messages: ChatMessage[];
  isOpen: boolean;
  isLoading: boolean;
  toggleChat: () => void;
  sendMessage: (
    userMessage: string,
    products: Product[],
    cartItems: CartItem[]
  ) => Promise<void>;
  clearChat: () => void;
}

// Gemini API types
export interface GeminiGenerationConfig {
  temperature: number;
  topK: number;
  topP: number;
  maxOutputTokens: number;
}

export interface GeminiRequestBody {
  contents: Array<{
    parts: Array<{
      text: string;
    }>;
  }>;
  generationConfig: GeminiGenerationConfig;
}

export interface GeminiResponseCandidate {
  content: {
    parts: Array<{
      text: string;
    }>;
  };
}

export interface GeminiResponse {
  candidates?: GeminiResponseCandidate[];
}

export interface GeminiErrorResponse {
  error: {
    code: number;
    message: string;
    status: string;
  };
}

export interface GeminiApiResult {
  success: boolean;
  text?: string;
  status?: number;
  error?: GeminiErrorResponse["error"];
}

// Error messages map
export type ErrorCode =
  | 503
  | 429
  | 400
  | 401
  | 404
  | 500
  | "network"
  | "timeout"
  | "default";

export type ErrorMessagesMap = Record<ErrorCode, string>;

// Re-export Product and CartItem from existing types
export type { Product, CartItem } from "./index";

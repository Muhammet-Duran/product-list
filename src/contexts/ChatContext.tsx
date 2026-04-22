import React, { createContext, useContext, useState, ReactNode } from "react";
import { askGemini } from "../services/geminiService";
import type {
  ChatMessage,
  ChatContextValue,
  Product,
  CartItem,
} from "../types/chat.types";

const ChatContext = createContext<ChatContextValue | undefined>(undefined);

interface ChatContextProviderProps {
  children: ReactNode;
}

export const ChatContextProvider: React.FC<ChatContextProviderProps> = ({
  children,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toggleChat = (): void => {
    setIsOpen(!isOpen);
  };

  const sendMessage = async (
    userMessage: string,
    products: Product[],
    cartItems: CartItem[]
  ): Promise<void> => {
    // Add user message
    const userMsg: ChatMessage = {
      id: Date.now(),
      role: "user",
      text: userMessage,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      // Get response from Gemini
      const response = await askGemini(userMessage, products, cartItems);

      // Add assistant message
      const assistantMsg: ChatMessage = {
        id: Date.now() + 1,
        role: "assistant",
        text: response,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (error) {
      // Add error message as assistant
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";

      const errorMsg: ChatMessage = {
        id: Date.now() + 1,
        role: "assistant",
        text: `Sorry, an error occurred: ${errorMessage}`,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = (): void => {
    setMessages([]);
  };

  const value: ChatContextValue = {
    messages,
    isOpen,
    isLoading,
    toggleChat,
    sendMessage,
    clearChat,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChatContext = (): ChatContextValue => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChatContext must be used within a ChatContextProvider");
  }
  return context;
};

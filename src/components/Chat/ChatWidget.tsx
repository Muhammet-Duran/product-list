import React, { useState, useRef, useEffect } from "react";
import { useChatContext } from "../../contexts/ChatContext";
import { useProductContext } from "../../contexts/ProductContext";
import styles from "./ChatWidget.module.scss";
import ChatMessage from "./ChatMessage";

declare global {
  interface Window {
    lastGeminiRequest?: number;
  }
}

const ChatWidget: React.FC = () => {
  const [inputText, setInputText] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { isOpen, messages, isLoading, toggleChat, sendMessage, clearChat } =
    useChatContext();

  const { cartList, products } = useProductContext();

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (): Promise<void> => {
    if (!inputText.trim() || isLoading) return;

    // Rate limiting - wait 3 seconds
    if (Date.now() - (window.lastGeminiRequest || 0) < 3000) {
      alert("Please wait a moment...");
      return;
    }

    window.lastGeminiRequest = Date.now();
    await sendMessage(inputText, products, cartList);
    setInputText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const TypingIndicator: React.FC = () => (
    <div className={styles.typing_indicator}>
      merhaba
      <div className={styles.typing_dots}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );

  return (
    <div className={styles.chat_widget}>
      {/* Floating Button */}
      <button className={styles.chat_toggle_btn} onClick={toggleChat}>
        {isOpen ? "✕" : "💬"}
      </button>

      {/* Chat Popup */}
      {isOpen && (
        <div className={styles.chat_popup}>
          {/* Header */}
          <div className={styles.chat_header}>
            <h3>🛒 Shopping Assistant</h3>
            <button className={styles.clear_chat_btn} onClick={clearChat}>
              Clear Chat
            </button>
          </div>

          {/* Messages Area */}
          <div className={styles.chat_messages}>
            {messages.length === 0 ? (
              <div className={styles.welcome_message}>
                Hello! You can ask questions about products or your cart 👋
              </div>
            ) : (
              messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))
            )}

            {isLoading && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className={styles.chat_input_area}>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              disabled={isLoading}
              className={styles.chat_input}
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading || !inputText.trim()}
              className={styles.send_btn}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;

import React from "react";
import type { ChatMessage as ChatMessageType } from "../../types/chat.types";
import styles from "./ChatWidget.module.scss";

interface ChatMessageProps {
  message: ChatMessageType;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const formatTime = (timestamp: string): string => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("tr-TR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatText = (text: string): React.ReactNode => {
    return text.split("\n").map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < text.split("\n").length - 1 && <br />}
      </React.Fragment>
    ));
  };

  const messageClass =
    message.role === "user"
      ? `${styles.message} ${styles.user_message}`
      : `${styles.message} ${styles.assistant_message}`;

  return (
    <div className={messageClass}>
      <div className={styles.message_content}>
        {message.role === "assistant" && (
          <span className={styles.bot_emoji}>🤖</span>
        )}
        <div className={styles.message_text}>{formatText(message.text)}</div>
        <div className={styles.message_time}>
          {formatTime(message.timestamp)}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;

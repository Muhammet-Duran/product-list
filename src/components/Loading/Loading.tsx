import React from "react";
import styles from "./Loading.module.scss";

interface LoadingProps {
  count?: number;
}

const Loading: React.FC<LoadingProps> = ({ count = 8 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <li key={index} className={styles.skeleton_card}>
          <div className={styles.skeleton_image}></div>
          <div className={styles.skeleton_content}>
            <div className={styles.skeleton_title}></div>
            <div className={styles.skeleton_price}></div>
            <div className={styles.skeleton_button}></div>
          </div>
        </li>
      ))}
    </>
  );
};

export default Loading;

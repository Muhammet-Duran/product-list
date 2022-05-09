import React from "react";
import styles from "./Modal.module.scss";
import Button from "../Button/Button";
import { useProductContext } from "../../contexts/ProductContext";

const Modal = ({ closeModal, product }) => {
  const { removeToCart } = useProductContext();
  const removeToCartHandle = () => {
    removeToCart(product);
    closeModal(false);
  };
  return (
    <div className={styles.modal_background}>
      <div className={styles.modal_container}>
        <div className={styles.modal_container__top}>
          <h1 className={styles.title}>Are you sure you want to continue?</h1>
        </div>
        <div className={styles.modal_container__body}>
          <p className={styles.description}>
            Lorem Ipsum has been the industry's standard dummy text ever since
            the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book. It has survived not only
            five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged
          </p>
        </div>
        <div className={styles.modal_container__footer}>
          <Button preferences="modal_btn" onClick={removeToCartHandle}>
            yes
          </Button>
          <Button
            preferences="modal_btn"
            onClick={() => {
              closeModal(false);
            }}
          >
            no
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

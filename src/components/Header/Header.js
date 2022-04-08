import React from 'react'
import styles from "./Header.module.scss"
import SearchArea from '../Form/SearchArea'
import {BsBagCheck} from  "react-icons/bs";
import {Link} from "react-router-dom";

const Header = () => {
  return (
    <header className={styles.header_wrapper}>
        <div className={styles.header_wrapper__container}>
            <Link to="/" className={styles.header_wrapper__container__logo}>
            <span className={styles.firstly}>e</span><span className={styles.others}>- STORE</span>
            </Link>
            <SearchArea />
            <Link to="/cart" className={styles.header_wrapper__container__cart}>
              <BsBagCheck className={styles.header_wrapper__container__cart__icon}/>
              <span className={styles.header_wrapper__container__cart__count}>0</span>
            </Link>
        </div>
        
    </header>
  )
}

export default Header
import React from 'react'
import styles from "./SearchArea.module.scss";

function SearchArea() {
  return (
    <div className={styles.search_area}>
      <input type="search" className={styles.search_area__input} placeholder="everything you are looking for is here"/>
    </div>
    
  )
}

export default SearchArea
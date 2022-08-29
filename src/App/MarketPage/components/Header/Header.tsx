import React from "react";

import classnames from "classnames";

import styles from "./Header.module.scss";

const Header: React.FC = () => {
  const changeStyles: string = classnames(
    styles.header__change,
    styles.header__change_red
  );
  return (
    <div className={styles.header}>
      <div className={styles.header__flexWrapper}>
        <span className={styles.header__title}>
          Market is down <span className={changeStyles}>-11.17%</span>
        </span>
        <button className={styles.header__searchButton} onClick={() => {}}>
          <svg
            width="20"
            height="20"
            fill="#6C757D"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8.552 17.105a8.5 8.5 0 0 0 5.236-1.805l4.7 4.7 1.51-1.512-4.699-4.7a8.502 8.502 0 0 0 1.806-5.236C17.105 3.837 13.268 0 8.552 0 3.837 0 0 3.837 0 8.552c0 4.716 3.837 8.553 8.552 8.553Zm0-14.967a6.42 6.42 0 0 1 6.415 6.414 6.42 6.42 0 0 1-6.415 6.415 6.42 6.42 0 0 1-6.414-6.415 6.42 6.42 0 0 1 6.414-6.414Z" />
          </svg>
        </button>
      </div>
      <span className={styles.header__subtitle}>In the past 24 hours</span>
    </div>
  );
};

export default Header;

import { useState } from "react";

import Button from "@components/Button";
import { ReactComponent as IconSearch } from "@icons/IconSearch.svg";
import classnames from "classnames";
import { useSearchParams } from "react-router-dom";

import Search from "../Search";
import styles from "./Header.module.scss";

const Header: React.FC = () => {
  const [isSearch, setIsSearch] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const closeHandler = (): void => {
    searchParams.delete("search");
    setSearchParams(searchParams);

    setIsSearch(false);
  };

  const changeStyles: string = classnames(
    styles.header__change,
    styles.header__change_red
  );

  const children = isSearch ? (
    <div className={styles.header__flexWrapper}>
      <Search className={styles.header__search} />
      <Button onClick={closeHandler}>Cancel</Button>
    </div>
  ) : (
    <>
      <div className={styles.header__flexWrapper}>
        <span className={styles.header__title}>
          Market is down <span className={changeStyles}>-11.17%</span>
        </span>
        <Button
          className={styles.header__searchButton}
          onClick={() => setIsSearch(true)}
        >
          <IconSearch />
        </Button>
      </div>
      <span className={styles.header__subtitle}>In the past 24 hours</span>
    </>
  );

  return <div className={styles.header}>{children}</div>;
};

export default Header;

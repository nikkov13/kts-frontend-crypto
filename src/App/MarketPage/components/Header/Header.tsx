import Button from "@components/Button";
import { ReactComponent as IconSearch } from "@icons/IconSearch.svg";
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
        <Button className={styles.header__searchButton} onClick={() => {}}>
          <IconSearch />
        </Button>
      </div>
      <span className={styles.header__subtitle}>In the past 24 hours</span>
    </div>
  );
};

export default Header;

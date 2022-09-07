import { useEffect, useState } from "react";

import Button from "@components/Button";
import { ReactComponent as IconSearch } from "@icons/IconSearch.svg";
import MarketChangeStore from "@store/MarketChangeStore";
import { formatPercent } from "@utils/formatPercent";
import { useLocalStore } from "@utils/useLocalStore";
import classnames from "classnames";
import { observer } from "mobx-react-lite";
import { useSearchParams } from "react-router-dom";

import Search from "../Search";
import styles from "./Header.module.scss";

const Header: React.FC = () => {
  const marketChangeStore = useLocalStore(() => new MarketChangeStore());
  const [isSearch, setIsSearch] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    marketChangeStore.getMarketChange();
  }, [marketChangeStore]);

  const marketChange = marketChangeStore.change;

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
        {marketChange && (
          <div className={styles.header__titleWrapper}>
            <span className={styles.header__title}>
              Market is {marketChange > 0 ? "up" : "down"}{" "}
              <span className={changeStyles}>
                {formatPercent(marketChange)}
              </span>
            </span>
            <span className={styles.header__subtitle}>
              In the past 24 hours
            </span>
          </div>
        )}
        <Button
          className={styles.header__searchButton}
          onClick={() => setIsSearch(true)}
        >
          <IconSearch />
        </Button>
      </div>
    </>
  );

  return <div className={styles.header}>{children}</div>;
};

export default observer(Header);

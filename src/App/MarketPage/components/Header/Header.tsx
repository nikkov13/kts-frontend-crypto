import { useEffect, useState } from "react";

import Button from "@components/Button";
import IconSearch from "@icons/IconSearch.svg";
import MarketChangeStore from "@store/MarketChangeStore";
import { useLocalStore } from "@utils/useLocalStore";
import { observer } from "mobx-react-lite";
import { useSearchParams } from "react-router-dom";

import MarketChange from "../MarketChange";
import Search from "../Search";
import styles from "./Header.module.scss";

const Header: React.FC = () => {
  const marketChangeStore = useLocalStore(() => new MarketChangeStore());
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSearch, setIsSearch] = useState(
    searchParams.get("search") ? true : false
  );

  useEffect(() => {
    marketChangeStore.getMarketChange();
  }, [marketChangeStore]);

  const marketChange = marketChangeStore.change;

  const closeHandler = (): void => {
    searchParams.delete("search");
    setSearchParams(searchParams);

    setIsSearch(false);
  };

  const children = isSearch ? (
    <div className={styles.header__flexWrapper}>
      <Search className={styles.header__search} />
      <Button onClick={closeHandler}>Cancel</Button>
    </div>
  ) : (
    <>
      <div className={styles.header__flexWrapper}>
        {marketChange && (
          <MarketChange
            className={styles.header__marketChange}
            change={marketChange}
          />
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

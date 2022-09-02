import { useEffect } from "react";

import WithLoader from "@components/WithLoader";
import CoinsListStore from "@store/CoinsListStore";
import { useLocalStore } from "@utils/useLocalStore";
import { observer } from "mobx-react-lite";

import CoinList from "./components/CoinList";
import Header from "./components/Header";
import Settings from "./components/Settings";
import styles from "./MarketPage.module.scss";

const MarketPage: React.FC = () => {
  const coinsListStore = useLocalStore(() => new CoinsListStore());

  useEffect(() => {
    coinsListStore.getCoinsList();
  }, [coinsListStore]);

  return (
    <div className={styles.marketPage}>
      <WithLoader loading={coinsListStore.isLoading}>
        <Header />
        <Settings />
        <CoinList coins={coinsListStore.list} />
      </WithLoader>
    </div>
  );
};

export default observer(MarketPage);

import { useEffect } from "react";

import Loader from "@components/Loader";
import CoinsListStore from "@store/CoinsListStore";
import { useQueryParamsStore } from "@store/RootStore/hooks/useQueryParamsStore";
import { useLocalStore } from "@utils/useLocalStore";
import { observer } from "mobx-react-lite";
import InfiniteScroll from "react-infinite-scroll-component";

import CoinList from "./components/CoinList";
import Header from "./components/Header";
import Settings from "./components/Settings";
import styles from "./MarketPage.module.scss";

const MarketPage: React.FC = () => {
  useQueryParamsStore();

  const coinsListStore = useLocalStore(() => new CoinsListStore());

  useEffect(() => {
    coinsListStore.getCoinsList();
  }, [coinsListStore]);

  return (
    <div className={styles.marketPage}>
      <Header />
      <Settings />
      <InfiniteScroll
        className={styles.marketPage_infiniteList}
        hasMore={coinsListStore.hasNextPage}
        loader={<Loader />}
        next={() => coinsListStore.getNewItems()}
        dataLength={coinsListStore.list.length}
        style={{ overflow: "hidden" }}
      >
        <CoinList coins={coinsListStore.list} />
      </InfiniteScroll>
    </div>
  );
};

export default observer(MarketPage);

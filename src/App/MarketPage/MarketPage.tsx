import { useEffect } from "react";

import Loader from "@components/Loader";
// import WithLoader from "@components/WithLoader";
import CoinsListStore from "@store/CoinsListStore";
import { useLocalStore } from "@utils/useLocalStore";
import { observer } from "mobx-react-lite";
import InfiniteScroll from "react-infinite-scroll-component";

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
      <Header />
      <Settings />
      <InfiniteScroll
        hasMore={coinsListStore.hasNextPage}
        loader={<Loader />}
        next={() => coinsListStore.setNextPage()}
        dataLength={coinsListStore.list.length}
        style={{
          overflowY: "visible",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <CoinList coins={coinsListStore.list} />
      </InfiniteScroll>
    </div>
  );
};

export default observer(MarketPage);

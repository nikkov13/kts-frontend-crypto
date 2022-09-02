import { useEffect } from "react";

import Card from "@components/Card/";
import WithLoader from "@components/WithLoader";
import CoinStore from "@store/CoinStore";
import { CoinItemModel } from "@store/models/coin";
import { useLocalStore } from "@utils/useLocalStore";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";

import styles from "./CoinPage.module.scss";
import Graph from "./components/Graph";
import Header from "./components/Header";
import Price from "./components/Price";
import Settings from "./components/Settings";
import Transactions from "./components/Transactions";

const CoinPage: React.FC = () => {
  const { id } = useParams();
  const coinStore = useLocalStore(() => new CoinStore());

  useEffect(() => {
    coinStore.getCoinData(String(id));
  }, [coinStore, id]);

  return (
    <div className={styles.coinPage}>
      <WithLoader loading={coinStore.isLoading}>
        {coinStore.coin && (
          <>
            <Header
              image={coinStore.coin.image}
              name={coinStore.coin.name}
              symbol={coinStore.coin.symbol}
            />
            <Price
              price={coinStore.coin.price}
              changeValue={coinStore.coin.changeValue}
              changePercents={coinStore.coin.changePercents}
            />
            <Graph />
            <Settings />
            <Card
              className={styles.coinPage__card}
              coin={coinStore.coin as CoinItemModel}
            />
            <Transactions />
          </>
        )}
      </WithLoader>
    </div>
  );
};

export default observer(CoinPage);

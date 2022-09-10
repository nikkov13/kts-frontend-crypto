import { useEffect } from "react";

import Card from "@components/Card/";
import WithLoader from "@components/WithLoader";
import CoinStore from "@store/CoinStore";
import { singleCoinToItem } from "@store/models/SingleCoin";
import { useLocalStore } from "@utils/useLocalStore";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";

import styles from "./CoinPage.module.scss";
import Header from "./components/Header";
import Price from "./components/Price";
import PriceGraph from "./components/PriceGraph";
import Settings from "./components/Settings";
import Transactions from "./components/Transactions";

const CoinPage: React.FC = () => {
  const { id } = useParams();
  const coinStore = useLocalStore(() => new CoinStore());

  useEffect(() => {
    coinStore.getCoinData(String(id));
  }, [coinStore, id]);

  const coinData = coinStore.coin;

  return (
    <div className={styles.coinPage}>
      <WithLoader loading={coinStore.isLoading}>
        {coinData && (
          <>
            <Header
              image={coinData.image}
              name={coinData.name}
              symbol={coinData.symbol}
            />
            <Price
              price={coinData.price}
              changeValue={coinData.changeValue}
              changePercents={coinData.changePercents}
            />
            <PriceGraph
              className={styles.coinPage__graph}
              data={coinData.sparkline}
            />
            <Settings />
            <Card
              className={styles.coinPage__card}
              coin={singleCoinToItem(coinStore.coin)}
            />
            <Transactions />
          </>
        )}
      </WithLoader>
    </div>
  );
};

export default observer(CoinPage);

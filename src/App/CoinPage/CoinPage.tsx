import { useEffect } from "react";

import Card from "@components/Card/";
import WithErrorMessage from "@components/WithErrorMessage";
import WithLoader from "@components/WithLoader";
import CoinStore from "@store/CoinStore";
import { singleCoinToItem } from "@store/models/singleCoin";
import PriceGraphStore from "@store/PriceGraphStore";
import { useLocalStore } from "@utils/useLocalStore";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { RequestStatus, TimeRanges } from "types";

import styles from "./CoinPage.module.scss";
import Header from "./components/Header";
import Price from "./components/Price";
import PriceGraph from "./components/PriceGraph";
import Settings from "./components/Settings";
import Transactions from "./components/Transactions";

const CoinPage: React.FC = () => {
  const { id } = useParams();
  const coinStore = useLocalStore(() => new CoinStore());
  const priceGraphStore = useLocalStore(() => new PriceGraphStore());

  useEffect(() => {
    coinStore.getCoinData(String(id));
    priceGraphStore.getRangeGraph(String(id), TimeRanges.week);
  }, [id, coinStore, priceGraphStore]);

  const coinData = coinStore.coin;

  return (
    <div className={styles.coinPage}>
      <WithLoader loading={coinStore.coinStatus === RequestStatus.pending}>
        <WithErrorMessage
          isError={coinStore.coinStatus === RequestStatus.error}
        >
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
                data={priceGraphStore.graph}
                status={priceGraphStore.graphStatus}
              />
              <Settings
                onClick={(range) =>
                  priceGraphStore.getRangeGraph(String(id), range)
                }
              />
              <Card
                className={styles.coinPage__card}
                coin={singleCoinToItem(coinStore.coin)}
              />
              <Transactions />
            </>
          )}
        </WithErrorMessage>
      </WithLoader>
    </div>
  );
};

export default observer(CoinPage);

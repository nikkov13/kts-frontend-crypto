import { useState, useEffect } from "react";

import type { Coin } from "@components/Card";
import Card from "@components/Card/";
import WithLoader from "@components/WithLoader";
import { API_BASE } from "@config/contants";
import axios from "axios";
import { useParams } from "react-router-dom";

import styles from "./CoinPage.module.scss";
import Graph from "./components/Graph";
import Header from "./components/Header";
import Price from "./components/Price";
import Settings from "./components/Settings";
import Transactions from "./components/Transactions";

type Response = {
  id: string;
  symbol: string;
  name: string;
  image: {
    large: string;
  };
  market_data: {
    current_price: Record<string, number>;
    price_change_percentage_24h_in_currency: Record<string, number>;
    price_change_24h_in_currency: Record<string, number>;
  };
};

const CoinPage: React.FC = () => {
  // eslint-disable-next-line no-console
  console.log("render coinpage");
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<Coin>();

  const { id } = useParams();

  const currency: string = "usd";

  useEffect(() => {
    const fetch = async () => {
      const result = await axios.get(API_BASE + `coins/${id}`);
      const data: Response = result.data;

      setData({
        id: data.id,
        image: data.image.large,
        name: data.name,
        symbol: data.symbol,
        price: data.market_data.current_price[currency],
        changePercents:
          data.market_data.price_change_percentage_24h_in_currency[currency],
        changeValue: data.market_data.price_change_24h_in_currency[currency],
      });

      setIsLoading(false);
    };

    fetch();
  }, [id]);

  return (
    <div className={styles.coinPage}>
      <WithLoader loading={isLoading}>
        {data && (
          <>
            <Header image={data.image} name={data.name} symbol={data.symbol} />
            <Price
              price={data.price}
              changeValue={data.changeValue as number}
              changePercents={data.changePercents}
            />
            <Graph />
            <Settings />
            <Card className={styles.coinPage__card} coin={data} />
            <Transactions />
          </>
        )}
      </WithLoader>
    </div>
  );
};

export default CoinPage;

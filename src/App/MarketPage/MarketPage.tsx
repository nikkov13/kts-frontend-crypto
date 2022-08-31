import { useEffect, useState } from "react";

import type { Coin } from "@components/Card/Card";
import WithLoader from "@components/WithLoader";
import { API_BASE } from "@config/contants";
import axios from "axios";

import CoinList from "./components/CoinList";
import Header from "./components/Header";
import Settings from "./components/Settings";
import styles from "./MarketPage.module.scss";

type ResponseItem = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
};

const MarketPage: React.FC = () => {
  // eslint-disable-next-line no-console
  console.log("render MarketPage");
  const [isLoading, setIsLoading] = useState(true);
  const [coins, setCoins] = useState<Coin[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const result: { data: ResponseItem[] } = await axios.get(
        API_BASE + "coins/markets?vs_currency=usd"
      );

      setCoins(
        result.data.map(
          (item): Coin => ({
            id: item.id,
            symbol: item.symbol,
            name: item.name,
            image: item.image,
            price: item.current_price,
            changePercents: item.price_change_percentage_24h,
          })
        )
      );

      setIsLoading(false);
    };

    fetch();
  }, []);

  return (
    <div className={styles.marketPage}>
      <WithLoader loading={isLoading}>
        <Header />
        <Settings />
        <CoinList coins={coins} />
      </WithLoader>
    </div>
  );
};

export default MarketPage;

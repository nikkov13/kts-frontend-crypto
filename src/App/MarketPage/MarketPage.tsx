import React, { useEffect, useState } from "react";

import type { Coin } from "@components/Card/Card";
import WithLoader from "@components/WithLoader";
import { API_BASE } from "@config/contants";
import axios from "axios";

import CoinList from "./components/CoinList";
import Header from "./components/Header";
import Settings from "./components/Settings";
import styles from "./MarketPage.module.scss";

const MarketPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [coins, setCoins] = useState<Coin[]>([]);

  useEffect(() => {
    setIsLoading(true);

    const fetch = async () => {
      let result = await axios.get(API_BASE + "coins/markets?vs_currency=usd");

      setCoins(
        result.data.map(
          (item: { [key: string]: string | number }): Coin => ({
            symbol: String(item.symbol),
            name: String(item.name),
            image: String(item.image),
            price: Number(item.current_price),
            priceChange: Number(item.price_change_percentage_24h),
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

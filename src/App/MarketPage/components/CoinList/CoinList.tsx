import Card from "@components/Card";
import type { Coin } from "@components/Card/Card";

import styles from "./CoinList.module.scss";

export type CoinListProps = {
  coins: Coin[];
};

const CoinList: React.FC<CoinListProps> = ({ coins }) => {
  return (
    coins && (
      <ul className={styles.list}>
        {coins.map((coin) => {
          return (
            <li className={styles.list__item} key={coin.symbol}>
              <Card coin={coin} />
            </li>
          );
        })}
      </ul>
    )
  );
};

export default CoinList;

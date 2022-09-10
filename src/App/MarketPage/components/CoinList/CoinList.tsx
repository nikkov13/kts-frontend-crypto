import Card from "@components/Card";
import { CoinItemModel } from "@store/models/coinItem";

import styles from "./CoinList.module.scss";

export type CoinListProps = {
  coins: CoinItemModel[];
};

const CoinList: React.FC<CoinListProps> = ({ coins }) => {
  return (
    coins && (
      <ul className={styles.list}>
        {coins.map((coin) => {
          return (
            <li className={styles.list__item} key={coin.id}>
              <Card coin={coin} />
            </li>
          );
        })}
      </ul>
    )
  );
};

export default CoinList;

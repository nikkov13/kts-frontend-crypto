import Sparkline from "@components/Sparkline";
import { GAIN_GREEN, LOSE_RED } from "@config/contants";
import { CoinItemModel } from "@store/models/CoinItem";
import { formatPercent } from "@utils/formatPercent";
import { formatPrice } from "@utils/formatPrice";
import classNames from "classnames";
import { Link } from "react-router-dom";

import styles from "./Card.module.scss";

export type CardProps = {
  coin: CoinItemModel;
  className?: string;
  onClick?: React.MouseEventHandler;
};

const Card: React.FC<CardProps> = ({ coin, className }) => {
  let changeClassMod = "";

  if (coin.changePercents7d !== 0) {
    changeClassMod = coin.changePercents > 0 ? "green" : "red";
  }

  const changeClass = classNames(
    styles.card__change,
    styles["card__change_" + changeClassMod]
  );

  const cardClass = classNames(styles.card, className);

  let sparklineColor: string | undefined;

  if (coin.changePercents7d !== 0) {
    sparklineColor = coin.changePercents7d > 0 ? GAIN_GREEN : LOSE_RED;
  }

  return (
    <Link to={`/coin/${coin.id}`} className={cardClass}>
      <img
        className={styles.card__image}
        src={coin.image}
        alt={coin.name + " logo"}
      ></img>
      <div className={styles.card__titleWrapper}>
        <h2 className={styles.card__title}>{coin.name}</h2>
        <span className={styles.card__subtitle}>{coin.symbol}</span>
      </div>
      <Sparkline
        className={styles.card__sparkline}
        data={coin.sparkline}
        color={sparklineColor}
      />
      <div className={styles.card__priceWrapper}>
        <span className={styles.card__price}>{formatPrice(coin.price)}</span>
        <span className={changeClass}>
          {formatPercent(coin.changePercents)}
        </span>
      </div>
    </Link>
  );
};

export default Card;

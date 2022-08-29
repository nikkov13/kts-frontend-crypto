import React from "react";

import classNames from "classnames";

import styles from "./Card.module.scss";

export type Coin = {
  image: string;
  name: string;
  symbol: string;
  price: number;
  priceChange: number;
};

export type CardProps = {
  coin: Coin;
  onClick?: React.MouseEventHandler;
};

const Card: React.FC<CardProps> = ({ coin, onClick }) => {
  const changeColor: string = Number(coin.priceChange) > 0 ? "green" : "red";

  const changeClass: string = classNames(
    styles.card__change,
    styles["card__change_" + changeColor]
  );

  return (
    <div className={styles.card} onClick={onClick}>
      <img
        className={styles.card__image}
        src={coin.image}
        alt={coin.name + " logo"}
      ></img>
      <div className={styles.card__titleWrapper}>
        <h2 className={styles.card__title}>{coin.name}</h2>
        <span className={styles.card__subtitle}>{coin.symbol}</span>
      </div>
      <div className={styles.card__priceWrapper}>
        <span className={styles.card__price}>${coin.price.toFixed(2)}</span>
        <span className={changeClass}>{coin.priceChange.toFixed(2)}%</span>
      </div>
    </div>
  );
};

export default Card;

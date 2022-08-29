import classnames from "classnames";

import styles from "./Price.module.scss";

export type PriceProps = {
  price: number;
  changeValue: number;
  changePercents: number;
};

const Price: React.FC<PriceProps> = ({
  price,
  changeValue,
  changePercents,
}) => {
  const changeColor: string = changeValue > 0 ? "green" : "red";
  const changeClass: string = classnames(
    styles.price__change,
    styles[`price__change_${changeColor}`]
  );

  const formPriceChange = (value: number, percents: number): string => {
    const sign: string = value > 0 ? "+" : "";
    return `${sign}${value.toFixed(3)} (${percents.toFixed(2)}%)`;
  };

  return (
    <div className={styles.price}>
      <span className={styles.price__value}>${price}</span>
      <span className={changeClass}>
        {formPriceChange(changeValue, changePercents)}
      </span>
    </div>
  );
};

export default Price;

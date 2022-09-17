import { formatPrice } from "@utils/formatPrice";
import { formatPriceChange } from "@utils/formatPriceChange";
import { getChangeColor } from "@utils/getChangeColor";
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
  const changeColor = getChangeColor(changeValue);

  const changeClass: string = classnames(
    styles.price__change,
    styles[`price__change_${changeColor}`]
  );

  return (
    <div className={styles.price}>
      <span className={styles.price__value}>{formatPrice(price)}</span>
      <span className={changeClass}>
        {formatPriceChange(changeValue, changePercents)}
      </span>
    </div>
  );
};

export default Price;

import React from "react";

import { formatPercent } from "@utils/formatPercent";
import { getChangeColor } from "@utils/getChangeColor";
import classnames from "classnames";

import styles from "./MarketChange.module.scss";

export type MarketChangeProps = {
  className: string;
  change: number;
};

const MarketChange: React.FC<MarketChangeProps> = ({ className, change }) => {
  const changeClassMod = getChangeColor(change);

  const changeClass = classnames(styles.change, {
    [styles["change_" + changeClassMod]]: changeClassMod,
  });

  return (
    <div className={className}>
      <span className={styles.title}>
        Market is {change > 0 ? "up" : "down"}{" "}
        <span className={changeClass}>{formatPercent(change)}</span>
      </span>
      <span className={styles.subtitle}>In the past 24 hours</span>
    </div>
  );
};

export default MarketChange;

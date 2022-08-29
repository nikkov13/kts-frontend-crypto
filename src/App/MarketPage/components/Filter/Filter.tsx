import React from "react";

import classnames from "classnames";

import styles from "./Filter.module.scss";

const Filter: React.FC = () => {
  const [active, setActive] = React.useState<string>("all");
  const categories: string[] = ["all", "gainer", "loser", "favourites"];

  return (
    <ul className={styles.filter__list}>
      {categories.map((item) => {
        const className = classnames(styles.filter__item, {
          [styles.filter__item_active]: item === active,
        });
        return (
          <li className={className} key={item} onClick={() => setActive(item)}>
            {item}
          </li>
        );
      })}
    </ul>
  );
};

export default Filter;

import { useState } from "react";

import Button from "@components/Button";
import { useSearchParams } from "react-router-dom";

import styles from "./Filter.module.scss";

const Filter: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [active, setActive] = useState<string>(
    searchParams.get("category") || "all"
  );

  const categories: string[] = ["all", "favourites"];

  const handleClick = (item: string): void => {
    setActive(item);

    item === "all"
      ? searchParams.delete("category")
      : searchParams.set("category", item);

    setSearchParams(searchParams);
  };

  return (
    <ul className={styles.filter__list}>
      {categories.map((item) => {
        return (
          <li className={styles.filter__item} key={item}>
            <Button
              className={styles.filter__button}
              onClick={() => handleClick(item)}
              disabled={item === active}
            >
              {item}
            </Button>
          </li>
        );
      })}
    </ul>
  );
};

export default Filter;

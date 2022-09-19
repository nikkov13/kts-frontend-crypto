import { useEffect, useState } from "react";

import Button from "@components/Button";
import CategoriesStore from "@store/CategoriesStore";
import { useLocalStore } from "@utils/useLocalStore";
import { observer } from "mobx-react-lite";
import { useSearchParams } from "react-router-dom";

import styles from "./Filter.module.scss";

const Filter: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [active, setActive] = useState<string>(
    searchParams.get("category") || "all"
  );
  const categoriesStore = useLocalStore(() => new CategoriesStore());
  const categories = categoriesStore.categories;

  useEffect(() => {
    categoriesStore.getCategories();
  }, [categoriesStore]);

  const handleClick = (item: string): void => {
    setActive(item);

    item === "all"
      ? searchParams.delete("category")
      : searchParams.set("category", item);

    setSearchParams(searchParams);
  };

  return (
    <ul className={styles.filter__list}>
      {categories.names.map((name) => {
        const id = categories.map[name];
        return (
          <li className={styles.filter__item} key={name}>
            <Button
              className={styles.filter__button}
              onClick={() => handleClick(id)}
              disabled={id === active}
            >
              {name}
            </Button>
          </li>
        );
      })}
    </ul>
  );
};
export default observer(Filter);

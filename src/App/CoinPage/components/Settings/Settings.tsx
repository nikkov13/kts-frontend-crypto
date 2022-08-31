import { useState } from "react";

import classnames from "classnames";

import styles from "./Settings.module.scss";

const Settings: React.FC = () => {
  const [active, setActive] = useState<string>("1 H");
  const timeRanges: string[] = [
    "1 H",
    "24 H",
    "1 W",
    "1 M",
    "6 M",
    "1 Y",
    "All",
  ];

  return (
    <ul className={styles.settings__list}>
      {timeRanges.map((item) => {
        const className = classnames(styles.settings__item, {
          [styles.settings__item_active]: item === active,
        });

        return (
          <li
            className={className}
            key={item.replace(" ", "")}
            onClick={() => setActive(item)}
          >
            {item}
          </li>
        );
      })}
    </ul>
  );
};

export default Settings;

import { useState } from "react";

import Button from "@components/Button";
import classnames from "classnames";
import { TimeRanges } from "types";

import styles from "./Settings.module.scss";

export type SettingsProps = {
  onClick: (range: TimeRanges) => void;
};

const Settings: React.FC<SettingsProps> = ({ onClick }) => {
  const [active, setActive] = useState(TimeRanges.week);

  const clickHandler = (value: TimeRanges): void => {
    setActive(value);
    onClick(value);
  };

  return (
    <ul className={styles.settings__list}>
      {Object.values(TimeRanges).map((value, i) => {
        const isActive = value === active;
        const className = classnames(styles.settings__button, {
          [styles.settings__button_active]: isActive,
        });

        return (
          <li key={i}>
            <Button
              className={className}
              onClick={() => clickHandler(value)}
              disabled={isActive}
            >
              {value}
            </Button>
          </li>
        );
      })}
    </ul>
  );
};

export default Settings;

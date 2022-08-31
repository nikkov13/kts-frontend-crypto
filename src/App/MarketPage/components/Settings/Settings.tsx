import { useEffect, useState } from "react";

import { API_BASE } from "@config/contants";
import axios from "axios";

import Filter from "../Filter";
import MultiDropdown from "../MultiDropdown";
import styles from "./Settings.module.scss";

const Settings: React.FC = () => {
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [value, setValue] = useState<string>("usd");

  useEffect(() => {
    const fetch = async () => {
      let result = await axios.get(API_BASE + "simple/supported_vs_currencies");
      setCurrencies(result.data);
    };

    fetch();
  }, []);

  return (
    <div className={styles.settings}>
      <div className={styles.settings__wrapper}>
        <h2 className={styles.settings__title}>Coins</h2>
        <MultiDropdown
          options={currencies}
          value={value}
          onChange={(value) => setValue(value)}
        />
      </div>
      <Filter />
    </div>
  );
};

export default Settings;

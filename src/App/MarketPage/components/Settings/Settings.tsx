import { useEffect } from "react";

import CurrenciesStore from "@store/CurrenciesStore";
import rootStore from "@store/RootStore";
import { useLocalStore } from "@utils/useLocalStore";
import { observer } from "mobx-react-lite";

import Filter from "../Filter";
import MultiDropdown from "../MultiDropdown";
import styles from "./Settings.module.scss";

const Settings: React.FC = () => {
  const currenciesStore = useLocalStore(() => new CurrenciesStore());
  const currentCurrencyStore = rootStore.currentCurrency;

  useEffect(() => {
    currenciesStore.getCurrencies();
  }, [currenciesStore]);

  return (
    <div className={styles.settings}>
      <div className={styles.settings__wrapper}>
        <h2 className={styles.settings__title}>Coins</h2>
        <MultiDropdown
          options={currenciesStore.currencies}
          value={currentCurrencyStore.currency}
          onChange={(value) => {
            currentCurrencyStore.currency = value;
          }}
        />
      </div>
      <Filter />
    </div>
  );
};

export default observer(Settings);

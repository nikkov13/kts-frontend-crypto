import CurrentCurrencyStore from "./CurrentCurrencyStore";

export default class RootStore {
  readonly currentCurrency = new CurrentCurrencyStore();
}

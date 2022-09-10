import CurrentCurrencyStore from "./CurrentCurrencyStore";
import QueryParamsStore from "./QueryParamsStore";

export default class RootStore {
  readonly currentCurrency = new CurrentCurrencyStore();
  readonly query = new QueryParamsStore();
}

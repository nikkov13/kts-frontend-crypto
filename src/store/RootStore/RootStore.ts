import CurrentCurrencyStore from "./CurrentCurrencyStore";
import FavouriteCoinsStore from "./FavouriteCoinsStore/FavouriteCoinsStore";
import QueryParamsStore from "./QueryParamsStore";

export default class RootStore {
  readonly currentCurrency = new CurrentCurrencyStore();
  readonly favouriteCoins = new FavouriteCoinsStore();
  readonly query = new QueryParamsStore();
}

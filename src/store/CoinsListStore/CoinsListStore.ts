import { API_BASE } from "@config/contants";
import rootStore from "@store/RootStore";
import { ILocalStore } from "@utils/useLocalStore";
import axios from "axios";
import {
  action,
  computed,
  IReactionDisposer,
  makeObservable,
  observable,
  reaction,
  runInAction,
} from "mobx";

import { CoinItemApi, CoinItemModel, normalizeCoin } from "../models/coin";

type PrivateFields = "_list" | "_isLoading";

export default class CoinsListStore implements ILocalStore {
  private _list: CoinItemModel[] = [];
  private _isLoading: boolean = false;

  constructor() {
    makeObservable<CoinsListStore, PrivateFields>(this, {
      _list: observable.ref,
      _isLoading: observable,
      list: computed,
      isLoading: computed,
      getCoinsList: action,
    });
  }

  get list(): CoinItemModel[] {
    return this._list;
  }

  get isLoading(): boolean {
    return this._isLoading;
  }

  async getCoinsList(): Promise<void> {
    this._isLoading = true;
    this._list = [];

    const currency = rootStore.currentCurrency.currency;

    const response = await axios.get<CoinItemApi[]>(
      API_BASE + "coins/markets?vs_currency=" + currency
    );

    runInAction(() => {
      this._isLoading = false;
      this._list = response.data.map((item) => normalizeCoin(item));
    });
  }

  private readonly _getCoinsList: IReactionDisposer = reaction(
    () => rootStore.currentCurrency.currency,
    () => this.getCoinsList()
  );

  destroy(): void {
    // nothing
  }
}

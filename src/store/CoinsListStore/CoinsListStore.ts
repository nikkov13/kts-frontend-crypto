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

type PrivateFields = "_list" | "_isLoading" | "_page" | "_hasNextPage";

export default class CoinsListStore implements ILocalStore {
  private _list: CoinItemModel[] = [];
  private _page = 1;
  private _hasNextPage = true;
  private _isLoading = false;

  constructor() {
    makeObservable<CoinsListStore, PrivateFields>(this, {
      _list: observable.ref,
      _isLoading: observable,
      _page: observable,
      _hasNextPage: observable,
      list: computed,
      hasNextPage: computed,
      isLoading: computed,
      setNextPage: action,
      getCoinsList: action,
      getNewItems: action,
    });
  }

  get list(): CoinItemModel[] {
    return this._list;
  }

  get hasNextPage(): boolean {
    return this._hasNextPage;
  }

  get isLoading(): boolean {
    return this._isLoading;
  }

  setNextPage(): void {
    this._page++;
  }

  async getCoinsList(): Promise<void> {
    this._isLoading = true;
    this._list = [];

    const currency = rootStore.currentCurrency.currency;

    const response = await axios.get<CoinItemApi[]>(
      `${API_BASE}coins/markets?vs_currency=${currency}`
    );

    runInAction(() => {
      this._isLoading = false;
      this._list = response.data.map((item) => normalizeCoin(item));
    });
  }

  async getNewItems(): Promise<void> {
    const currency = rootStore.currentCurrency.currency;

    const response = await axios.get<CoinItemApi[]>(
      `${API_BASE}coins/markets?vs_currency=${currency}&per_page=100&page=${this._page}`
    );

    runInAction(() => {
      if (response.data.length === 0) {
        this._hasNextPage = false;
      } else {
        this._list = [
          ...this._list,
          ...response.data.map((item) => normalizeCoin(item)),
        ];
      }
    });
  }

  private readonly _getCoinsList: IReactionDisposer = reaction(
    () => rootStore.currentCurrency.currency,
    () => this.getCoinsList()
  );

  private readonly _getNewItems: IReactionDisposer = reaction(
    () => this._page,
    () => this.getNewItems()
  );

  destroy(): void {
    // nothing
  }
}

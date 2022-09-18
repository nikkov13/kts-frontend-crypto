import { ITEMS_PER_PAGE } from "@config/contants";
import apiEndpointStore from "@store/ApiEndpointStore";
import rootStore from "@store/RootStore";
import { ILocalStore } from "@utils/useLocalStore";
import axios from "axios";
import {
  action,
  computed,
  makeObservable,
  observable,
  reaction,
  runInAction,
} from "mobx";

import { CoinItemApi, CoinItemModel, normalizeCoin } from "../models/coinItem";

type PrivateFields = "_list" | "_isLoading" | "_page" | "_hasNextPage";

export default class CoinsListStore implements ILocalStore {
  private _list: CoinItemModel[] = [];
  private _page = 1;
  private _hasNextPage = true;
  private _isLoading = false;

  constructor() {
    makeObservable<CoinsListStore, PrivateFields>(this, {
      _list: observable.ref,
      _page: observable,
      _hasNextPage: observable,
      _isLoading: observable,
      list: computed,
      hasNextPage: computed,
      isLoading: computed,
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

  async getCoinsList(): Promise<void> {
    this._isLoading = true;
    this._hasNextPage = true;
    this._list = [];

    const endpoint = await apiEndpointStore.getListEndpoint(this._page);
    const response = await axios.get<CoinItemApi[]>(endpoint);

    runInAction(() => {
      this._isLoading = false;
      this._list = response.data.map((item) => normalizeCoin(item));
    });
  }

  async getNewItems(): Promise<void> {
    const endpoint = await apiEndpointStore.getListEndpoint(++this._page);
    const response = await axios.get<CoinItemApi[]>(endpoint);

    runInAction(() => {
      if (response.data.length < ITEMS_PER_PAGE) {
        this._hasNextPage = false;
      }

      this._list = [
        ...this._list,
        ...response.data.map((item) => normalizeCoin(item)),
      ];

      this._page = Math.ceil(this._list.length / ITEMS_PER_PAGE);
    });
  }

  destroy(): void {
    this._currencyChangeReaction();
    this._qsChangeReaction();
  }

  private readonly _currencyChangeReaction = reaction(
    () => rootStore.currentCurrency.currency,
    () => this.getCoinsList()
  );

  private readonly _qsChangeReaction = reaction(
    () => rootStore.query.getParam("search"),
    () => this.getCoinsList()
  );
}

import { API_BASE, ITEMS_PER_PAGE } from "@config/contants";
import { normalizeSearchCoins, searchCoinsApi } from "@store/models/searchCoin";
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

    const currency = rootStore.currentCurrency.currency;

    let uri = `
      ${API_BASE}coins/markets?vs_currency=${currency}&per_page=${ITEMS_PER_PAGE}&sparkline=true&price_change_percentage=7d
    `;

    const search = rootStore.query.getParam("search");

    if (search !== undefined) {
      const ids = await axios.get<searchCoinsApi>(
        `${API_BASE}search?query=${search}`
      );

      const idsURI = encodeURIComponent(normalizeSearchCoins(ids.data).ids);
      uri += `&ids=${idsURI}`;
    }

    const response = await axios.get<CoinItemApi[]>(uri);

    runInAction(() => {
      this._isLoading = false;
      this._list = response.data.map((item) => normalizeCoin(item));
    });
  }

  async getNewItems(): Promise<void> {
    const currency = rootStore.currentCurrency.currency;
    const search = rootStore.query.getParam("search");

    let uri = `${API_BASE}coins/markets?vs_currency=${currency}&per_page=${ITEMS_PER_PAGE}&page=${++this
      ._page}&sparkline=true`;

    if (search !== undefined) {
      const ids = await axios.get<searchCoinsApi>(
        `${API_BASE}search?query=${search}`
      );

      const idsURI = encodeURIComponent(normalizeSearchCoins(ids.data).ids);
      uri += `&ids=${idsURI}`;
    }

    const response = await axios.get<CoinItemApi[]>(uri);

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

  private readonly _currencyChangeReaction: IReactionDisposer = reaction(
    () => rootStore.currentCurrency.currency,
    () => this.getCoinsList()
  );

  private readonly _qpReaction: IReactionDisposer = reaction(
    () => rootStore.query.getParam("search"),
    () => this.getCoinsList()
  );

  destroy(): void {
    // nothing
  }
}

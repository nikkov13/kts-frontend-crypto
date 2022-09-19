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
import { RequestStatus } from "types";

import { CoinItemApi, CoinItemModel, normalizeCoin } from "../models/coinItem";

type PrivateFields = "_list" | "_status" | "_page" | "_hasNextPage";

export default class CoinsListStore implements ILocalStore {
  private _list: CoinItemModel[] = [];
  private _page = 0;
  private _hasNextPage = true;
  private _status = RequestStatus.pending;

  constructor() {
    makeObservable<CoinsListStore, PrivateFields>(this, {
      _list: observable.ref,
      _page: observable,
      _hasNextPage: observable,
      _status: observable,
      list: computed,
      hasNextPage: computed,
      status: computed,
      getPage: action,
    });
  }

  get list(): CoinItemModel[] {
    return this._list;
  }

  get hasNextPage(): boolean {
    return this._hasNextPage;
  }

  get status(): RequestStatus {
    return this._status;
  }

  async getPage(nextPage = false): Promise<void> {
    if (!nextPage) {
      this._page = 0;
      this._hasNextPage = true;
      this._list = [];
    }

    this._status = RequestStatus.pending;

    try {
      const endpoint = await apiEndpointStore.getListEndpoint(++this._page);
      const response = await axios.get<CoinItemApi[]>(endpoint);

      runInAction(() => {
        this._status = RequestStatus.success;

        if (response.data.length < ITEMS_PER_PAGE) {
          this._hasNextPage = false;
        }

        this._list = [
          ...this._list,
          ...response.data.map((item) => normalizeCoin(item)),
        ];

        this._page = Math.ceil(this._list.length / ITEMS_PER_PAGE);
      });
    } catch (error) {
      runInAction(() => {
        this._hasNextPage = false;
        this._status = RequestStatus.error;
      });
    }
  }

  destroy(): void {
    this._currencyChangeReaction();
    this._qsSearchReaction();
    this._qsCategoryReaction();
  }

  private readonly _currencyChangeReaction = reaction(
    () => rootStore.currentCurrency.currency,
    () => this.getPage()
  );

  private readonly _qsSearchReaction = reaction(
    () => rootStore.query.getParam("search"),
    () => this.getPage()
  );

  private readonly _qsCategoryReaction = reaction(
    () => rootStore.query.getParam("category"),
    () => this.getPage()
  );
}

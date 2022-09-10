import { API_BASE } from "@config/contants";
import rootStore from "@store/RootStore";
import { ILocalStore } from "@utils/useLocalStore";
import axios from "axios";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";

import {
  SingleCoinApi,
  SingleCoinModel,
  normalizeSingleCoin,
} from "../models/SingleCoin";

type PrivateFields = "_coin" | "_isLoading";

export default class CoinStore implements ILocalStore {
  private _coin: SingleCoinModel | null = null;
  private _isLoading: boolean = false;

  constructor() {
    makeObservable<CoinStore, PrivateFields>(this, {
      _coin: observable.ref,
      _isLoading: observable,
      coin: computed,
      isLoading: computed,
      getCoinData: action,
    });
  }

  get coin(): SingleCoinModel | null {
    return this._coin;
  }

  get isLoading(): boolean {
    return this._isLoading;
  }

  async getCoinData(id: string): Promise<void> {
    this._isLoading = true;
    this._coin = null;

    const response = await axios.get<SingleCoinApi>(
      `${API_BASE}coins/${id}?sparkline=true`
    );

    runInAction(() => {
      this._isLoading = false;
      this._coin = normalizeSingleCoin(
        response.data,
        rootStore.currentCurrency.currency
      );
    });
  }

  destroy(): void {
    // nothing
  }
}

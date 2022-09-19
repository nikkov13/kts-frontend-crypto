import apiEndpointStore from "@store/ApiEndpointStore";
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
import { RequestStatus } from "types";

import {
  SingleCoinApi,
  SingleCoinModel,
  normalizeSingleCoin,
} from "../models/singleCoin";

type PrivateFields = "_coin" | "_coinStatus";

export default class CoinStore implements ILocalStore {
  private _coin: SingleCoinModel | null = null;
  private _coinStatus = RequestStatus.pending;

  constructor() {
    makeObservable<CoinStore, PrivateFields>(this, {
      _coin: observable.ref,
      _coinStatus: observable,
      coin: computed,
      coinStatus: computed,
      getCoinData: action,
    });
  }

  get coin(): SingleCoinModel | null {
    return this._coin;
  }

  get coinStatus(): RequestStatus {
    return this._coinStatus;
  }

  async getCoinData(id: string): Promise<void> {
    this._coinStatus = RequestStatus.pending;
    this._coin = null;

    const endpoint = apiEndpointStore.getCoinEndpoint(id);

    try {
      const response = await axios.get<SingleCoinApi>(endpoint);

      runInAction(() => {
        this._coinStatus = RequestStatus.success;
        this._coin = normalizeSingleCoin(
          response.data,
          rootStore.currentCurrency.currency
        );
      });
    } catch (error) {
      runInAction(() => {
        this._coinStatus = RequestStatus.error;
      });
    }
  }

  destroy(): void {
    // nothing
  }
}

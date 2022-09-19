import apiEndpointStore from "@store/ApiEndpointStore";
import {
  MarketChangeApi,
  nromalizeMarketChange,
} from "@store/models/marketChange";
import axios from "axios";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import { RequestStatus } from "types";

type PrivateFields = "_marketChange" | "_status";

export default class MarketChangeStore {
  private _marketChange: number | null = null;
  private _status = RequestStatus.pending;

  constructor() {
    makeObservable<MarketChangeStore, PrivateFields>(this, {
      _marketChange: observable,
      _status: observable,
      change: computed,
      isLoading: computed,
      getMarketChange: action,
    });
  }

  get change() {
    return this._marketChange;
  }

  get isLoading() {
    return this._status;
  }

  async getMarketChange(): Promise<void> {
    this._status = RequestStatus.pending;
    this._marketChange = null;

    const endpoint = apiEndpointStore.getChangeEndpoint();

    try {
      const response = await axios.get<MarketChangeApi>(endpoint);

      runInAction(() => {
        this._status = RequestStatus.success;
        this._marketChange = nromalizeMarketChange(response.data);
      });
    } catch (error) {
      this._status = RequestStatus.error;
    }
  }

  destroy(): void {
    // nothing there
  }
}

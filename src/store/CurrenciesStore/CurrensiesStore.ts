import apiEndpointStore from "@store/ApiEndpointStore";
import axios from "axios";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import { RequestStatus } from "types";

type PrivateFields = "_currencies" | "_status";

export default class CurrenciesStore {
  private _currencies: string[] = [];
  private _status = RequestStatus.pending;

  constructor() {
    makeObservable<CurrenciesStore, PrivateFields>(this, {
      _currencies: observable.ref,
      _status: observable,
      currencies: computed,
      status: computed,
      getCurrencies: action,
    });
  }

  get currencies() {
    return this._currencies;
  }

  get status() {
    return this._status;
  }

  async getCurrencies(): Promise<void> {
    this._status = RequestStatus.pending;
    this._currencies = [];

    const endpoint = apiEndpointStore.getCurrencyEndpoint();

    try {
      const response = await axios.get<string[]>(endpoint);

      runInAction(() => {
        this._status = RequestStatus.success;
        this._currencies = response.data;
      });
    } catch (error) {
      this._status = RequestStatus.error;
    }
  }

  destroy(): void {
    // nothing there
  }
}

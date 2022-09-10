import { API_BASE } from "@config/contants";
import axios from "axios";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";

type PrivateFields = "_currencies" | "_isLoading";

export default class CurrenciesStore {
  private _currencies: string[] = [];
  private _isLoading = false;

  constructor() {
    makeObservable<CurrenciesStore, PrivateFields>(this, {
      _currencies: observable.ref,
      _isLoading: observable,
      currencies: computed,
      isLoading: computed,
      getCurrencies: action,
    });
  }

  get currencies() {
    return this._currencies;
  }

  get isLoading() {
    return this._isLoading;
  }

  async getCurrencies(): Promise<void> {
    this._isLoading = true;
    this._currencies = [];

    const response = await axios.get<string[]>(
      API_BASE + "simple/supported_vs_currencies"
    );

    runInAction(() => {
      this._isLoading = false;
      this._currencies = response.data;
    });
  }

  destroy(): void {
    // nothing there
  }
}

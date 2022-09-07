import { API_BASE } from "@config/contants";
import {
  marketChangeApi,
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

type PrivateFields = "_marketChange" | "_isLoading";

export default class CurrenciesStore {
  private _marketChange: number | null = null;
  private _isLoading = false;

  constructor() {
    makeObservable<CurrenciesStore, PrivateFields>(this, {
      _marketChange: observable,
      _isLoading: observable,
      change: computed,
      isLoading: computed,
      getMarketChange: action,
    });
  }

  get change() {
    return this._marketChange;
  }

  get isLoading() {
    return this._isLoading;
  }

  async getMarketChange(): Promise<void> {
    this._isLoading = true;
    this._marketChange = null;

    const response = await axios.get<marketChangeApi>(API_BASE + "global");

    runInAction(() => {
      this._isLoading = false;
      this._marketChange = nromalizeMarketChange(response.data);
    });
  }

  destroy(): void {
    // nothing there
  }
}

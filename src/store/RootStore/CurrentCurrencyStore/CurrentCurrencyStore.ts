import { DEFAULT_CURRENCY } from "@config/contants";
import { computed, makeObservable, observable } from "mobx";

type PrivateFields = "_currency";

export default class CurrentCurrencyStore {
  private _currency: string = this._getFromSessionStorage();

  constructor() {
    makeObservable<CurrentCurrencyStore, PrivateFields>(this, {
      _currency: observable,
      currency: computed,
    });
  }

  get currency() {
    return this._currency;
  }

  set currency(curr) {
    this._currency = curr;
    sessionStorage.setItem("currency", curr);
  }

  private _getFromSessionStorage(): string {
    const currency = sessionStorage.getItem("currency");
    return currency ? currency : DEFAULT_CURRENCY;
  }
}

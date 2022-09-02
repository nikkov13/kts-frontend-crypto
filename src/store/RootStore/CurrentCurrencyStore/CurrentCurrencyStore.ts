import { DEFAULT_CURRENCY } from "@config/contants";
import { computed, makeObservable, observable } from "mobx";

type PrivateFields = "_currency";

export default class CurrenciesStore {
  private _currency: string = (() => {
    const currency = sessionStorage.getItem("currency");
    return currency ? currency : DEFAULT_CURRENCY;
  })();

  constructor() {
    makeObservable<CurrenciesStore, PrivateFields>(this, {
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
}

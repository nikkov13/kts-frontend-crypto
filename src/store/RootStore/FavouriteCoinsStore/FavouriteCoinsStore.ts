import { action, computed, makeObservable, observable, reaction } from "mobx";

type PrivateFields = "_coins";

export default class FavouriteCoinsStore {
  private _coins = observable.set(this._getFromSessionStorage());

  constructor() {
    makeObservable<FavouriteCoinsStore, PrivateFields>(this, {
      _coins: observable,
      coins: computed,
      setCoin: action,
      deleteCoin: action,
    });
  }

  get coins() {
    return this._coins;
  }

  private _getFromSessionStorage(): Set<string> {
    const coins = sessionStorage.getItem("favouriteCoins");
    return new Set<string>(coins ? JSON.parse(coins) : []);
  }

  setCoin(coin: string): void {
    this._coins.add(coin);
  }

  deleteCoin(coin: string): void {
    this._coins.delete(coin);
  }

  hasCoin(coin: string): boolean {
    return this._coins.has(coin);
  }

  destroy(): void {
    this._coinsChangeReaction();
  }

  private readonly _coinsChangeReaction = reaction(
    () => this._coins.toJSON(),
    (coins) => {
      sessionStorage.setItem("favouriteCoins", JSON.stringify(coins));
    }
  );
}

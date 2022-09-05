import { action, makeObservable, observable } from "mobx";
import qs from "qs";

type PrivateParams = "_params";

export default class QueryParamsStore {
  private _params: qs.ParsedQs = {};
  private _search: string = "";

  constructor() {
    makeObservable<QueryParamsStore, PrivateParams>(this, {
      _params: observable.ref,
      setSearch: action,
    });
  }

  getParam(
    key: string
  ): string | qs.ParsedQs | string[] | qs.ParsedQs[] | undefined {
    return this._params[key];
  }

  setSearch(search: string) {
    search = search.startsWith("?") ? search.slice(1) : search;

    if (search !== this._search) {
      this._search = search;
      this._params = qs.parse(search);
    }
  }
}

import apiEndpointStore from "@store/ApiEndpointStore";
import {
  CategoriesApi,
  CategoriesModel,
  normalizeCategories,
} from "@store/models/Categories";
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

type PrivateFields = "_categories" | "_status";

export default class CategoriesStore implements ILocalStore {
  private readonly _defaultCategories: CategoriesModel = {
    names: ["All", "Favourites"],
    map: {
      All: "all",
      Favourites: "favourites",
    },
  };
  private _categories: CategoriesModel = this._defaultCategories;
  private _status = RequestStatus.pending;

  constructor() {
    makeObservable<CategoriesStore, PrivateFields>(this, {
      _categories: observable.ref,
      _status: observable,
      categories: computed,
      status: computed,
      getCategories: action,
    });
  }

  get categories(): CategoriesModel {
    return this._categories;
  }

  get status(): RequestStatus {
    return this._status;
  }

  async getCategories(): Promise<void> {
    this._status = RequestStatus.pending;
    this._categories = this._defaultCategories;

    const endpoint = apiEndpointStore.getCategoriesEndpoint();

    try {
      const response = await axios.get<CategoriesApi>(endpoint);

      runInAction(() => {
        this._status = RequestStatus.success;
        const categories = normalizeCategories(response.data);
        this._categories = {
          names: [...this._defaultCategories.names, ...categories.names],
          map: {
            ...this._defaultCategories.map,
            ...categories.map,
          },
        };
      });
    } catch (error) {
      this._status = RequestStatus.error;
    }
  }

  destroy() {
    //
  }
}

import { API_BASE } from "@config/contants";
import {
  normalizeSparkline,
  SparklineApi,
  SparklineModel,
} from "@store/models/Sparkline";
import rootStore from "@store/RootStore";
import { TimeRanges, getMillisByRange } from "@utils/getMillisByRange";
import { parseDataWithTime } from "@utils/parseDataWithTime";
import { ILocalStore } from "@utils/useLocalStore";
import axios from "axios";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";

import {
  SingleCoinApi,
  SingleCoinModel,
  normalizeSingleCoin,
} from "../models/singleCoin";

type PrivateFields =
  | "_coin"
  | "_isLoading"
  | "_isSparklineLoading"
  | "_sparkline";

export default class CoinStore implements ILocalStore {
  private _coin: SingleCoinModel | null = null;
  private _sparkline: SparklineModel = [];
  private _isLoading = false;
  private _isSparklineLoading = false;

  constructor() {
    makeObservable<CoinStore, PrivateFields>(this, {
      _coin: observable.ref,
      _isLoading: observable,
      _isSparklineLoading: observable,
      _sparkline: observable,
      coin: computed,
      isLoading: computed,
      getCoinData: action,
      getRangeSparkline: action,
    });
  }

  get coin(): SingleCoinModel | null {
    return this._coin;
  }

  get isLoading(): boolean {
    return this._isLoading;
  }

  get sparkline(): SparklineModel {
    return this._sparkline;
  }

  get isSparklineLoading(): boolean {
    return this._isSparklineLoading;
  }

  async getCoinData(id: string): Promise<void> {
    this._isLoading = true;
    this._coin = null;

    const response = await axios.get<SingleCoinApi>(
      `${API_BASE}coins/${id}?sparkline=true`
    );

    runInAction(() => {
      this._isLoading = false;
      this._coin = normalizeSingleCoin(
        response.data,
        rootStore.currentCurrency.currency
      );
      this._sparkline = parseDataWithTime(
        response.data.market_data.sparkline_7d.price,
        response.data.market_data.last_updated
      );
    });
  }

  async getRangeSparkline(range: TimeRanges): Promise<void> {
    this._isSparklineLoading = true;
    this._sparkline = [];

    const rangeMillis = getMillisByRange(range);

    const response = await axios.get<SparklineApi>(
      `${API_BASE}coins/${this._coin?.id}/market_chart/range?vs_currency=${rootStore.currentCurrency.currency}&from=${rangeMillis.start}&to=${rangeMillis.end}`
    );

    runInAction(() => {
      this._isSparklineLoading = false;
      this._sparkline = normalizeSparkline(response.data);
    });
  }

  destroy(): void {
    // nothing
  }
}

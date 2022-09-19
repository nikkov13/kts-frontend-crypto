import apiEndpointStore from "@store/ApiEndpointStore";
import {
  normalizeSparkline,
  SparklineApi,
  SparklineModel,
} from "@store/models/Sparkline";
import { ILocalStore } from "@utils/useLocalStore";
import axios from "axios";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import { RequestStatus, TimeRanges } from "types";

type PrivateFields = "_graph" | "_graphStatus";

export default class PriceGraphStore implements ILocalStore {
  private _graph: SparklineModel = [];
  private _graphStatus = RequestStatus.pending;

  constructor() {
    makeObservable<PriceGraphStore, PrivateFields>(this, {
      _graph: observable,
      _graphStatus: observable,
      graph: computed,
      graphStatus: computed,
      getRangeGraph: action,
    });
  }

  get graph(): SparklineModel {
    return this._graph;
  }

  get graphStatus(): RequestStatus {
    return this._graphStatus;
  }

  async getRangeGraph(id: string, range: TimeRanges): Promise<void> {
    this._graphStatus = RequestStatus.pending;
    this._graph = [];

    const endpoint = apiEndpointStore.getGraphEndpoint(id, range);

    try {
      const response = await axios.get<SparklineApi>(endpoint);

      runInAction(() => {
        this._graphStatus = RequestStatus.success;
        this._graph = normalizeSparkline(response.data);
      });
    } catch (error) {
      runInAction(() => {
        this._graphStatus = RequestStatus.error;
      });
    }
  }

  destroy(): void {
    // nothing
  }
}

import { API_BASE, ITEMS_PER_PAGE } from "@config/contants";
import { normalizeSearchCoins, SearchCoinsApi } from "@store/models/searchCoin";
import rootStore from "@store/RootStore";
import { getMillisByRange } from "@utils/getMillisByRange";
import { ILocalStore } from "@utils/useLocalStore";
import axios from "axios";
import { reaction } from "mobx";
import { TimeRanges } from "types";

export default class ApiEndpointStore implements ILocalStore {
  private readonly _baseUrl = API_BASE;
  private _currency = rootStore.currentCurrency.currency;

  getCurrencyEndpoint(): string {
    return `${this._baseUrl}simple/supported_vs_currencies`;
  }

  getChangeEndpoint(): string {
    return `${this._baseUrl}/global`;
  }

  getGraphEndpoint(id: string, range: TimeRanges): string {
    const { start, end } = getMillisByRange(range);
    return `${this._baseUrl}coins/${id}/market_chart/range?vs_currency=${this._currency}&from=${start}&to=${end}`;
  }

  getCoinEndpoint(id: string): string {
    return `${this._baseUrl}coins/${id}?sparkline=true`;
  }

  async getListEndpoint(page: number): Promise<string> {
    const searchEndpoint = await this.getSearchEndpoint();

    return `${this._baseUrl}coins/markets?vs_currency=${this._currency}&per_page=${ITEMS_PER_PAGE}&page=${page}&sparkline=true&price_change_percentage=7d${searchEndpoint}`;
  }

  async getSearchEndpoint(): Promise<string> {
    const search = rootStore.query.getParam("search");
    let endpoint = "";

    if (search) {
      const ids = await axios.get<SearchCoinsApi>(
        `${API_BASE}search?query=${search}`
      );
      const idsURI = encodeURIComponent(normalizeSearchCoins(ids.data).ids);
      endpoint = `&ids=${idsURI}`;
    }

    return endpoint;
  }

  destroy(): void {
    this._currencyChangeReaction();
  }

  private readonly _currencyChangeReaction = reaction(
    () => rootStore.currentCurrency.currency,
    (currency) => {
      this._currency = currency;
    }
  );
}

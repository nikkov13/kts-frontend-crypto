import { CoinItemModel } from "./coinItem";

export type SingleCoinApi = {
  id: string;
  symbol: string;
  name: string;
  image: {
    large: string;
  };
  market_data: {
    current_price: Record<string, number>;
    price_change_percentage_24h_in_currency: Record<string, number>;
    price_change_24h_in_currency: Record<string, number>;
  };
};

export type SingleCoinModel = {
  changeValue: number;
} & CoinItemModel;

export const normalizeSingleCoin = (
  from: SingleCoinApi,
  currency: string
): SingleCoinModel => ({
  id: from.id,
  image: from.image.large,
  name: from.name,
  symbol: from.symbol,
  price: from.market_data.current_price[currency],
  changePercents:
    from.market_data.price_change_percentage_24h_in_currency[currency],
  changeValue: from.market_data.price_change_24h_in_currency[currency],
});

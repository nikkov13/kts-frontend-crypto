import { CoinItemModel } from "../CoinItem";

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
    price_change_percentage_7d: number;
    sparkline_7d: {
      price: number[];
    };
    last_updated: string;
  };
};

export type SingleCoinModel = Omit<CoinItemModel, "sparkline"> & {
  changeValue: number;
  sparkline: {
    price: number[];
    lastUpdate: string;
  };
};

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
  sparkline: {
    price: from.market_data.sparkline_7d.price,
    lastUpdate: from.market_data.last_updated,
  },
  changePercents7d: from.market_data.price_change_percentage_7d,
});

export const singleCoinToItem = (from: SingleCoinModel): CoinItemModel => ({
  id: from.id,
  image: from.image,
  name: from.name,
  symbol: from.symbol,
  price: from.price,
  changePercents: from.changePercents,
  changePercents7d: from.changePercents7d,
  sparkline: from.sparkline.price,
});

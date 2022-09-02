export type CoinItemApi = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
};

export type CoinItemModel = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  price: number;
  changePercents: number;
};

export const normalizeCoin = (from: CoinItemApi): CoinItemModel => ({
  id: from.id,
  symbol: from.symbol,
  name: from.name,
  image: from.image,
  price: from.current_price,
  changePercents: from.price_change_percentage_24h,
});

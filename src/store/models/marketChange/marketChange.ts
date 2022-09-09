export type MarketChangeApi = {
  data: {
    market_cap_change_percentage_24h_usd: number;
  };
};

export const nromalizeMarketChange = (from: MarketChangeApi): number => {
  return from.data.market_cap_change_percentage_24h_usd;
};

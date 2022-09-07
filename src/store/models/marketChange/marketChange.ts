export type marketChangeApi = {
  data: {
    market_cap_change_percentage_24h_usd: number;
  };
};

export const nromalizeMarketChange = (from: marketChangeApi): number => {
  return from.data.market_cap_change_percentage_24h_usd;
};

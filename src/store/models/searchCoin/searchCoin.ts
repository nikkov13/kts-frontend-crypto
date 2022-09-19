export type SearchCoinsApi = {
  coins: { api_symbol: string }[];
};

export const normalizeSearchCoins = (from: SearchCoinsApi): string[] => {
  return from.coins.map((coin) => coin.api_symbol);
};

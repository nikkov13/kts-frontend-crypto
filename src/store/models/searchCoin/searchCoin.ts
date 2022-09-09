export type SearchCoinsApi = {
  coins: { api_symbol: string }[];
};

export type SearchCoinsModel = {
  ids: string;
};

export const normalizeSearchCoins = (
  from: SearchCoinsApi
): SearchCoinsModel => {
  return {
    ids: from.coins.reduce((ids, coin) => ids + `${coin.api_symbol},`, ""),
  };
};

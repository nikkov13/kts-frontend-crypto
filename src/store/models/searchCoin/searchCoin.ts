export type searchCoinsApi = {
  coins: { api_symbol: string }[];
};

export type searchCoinsModel = {
  ids: string;
};

export const normalizeSearchCoins = (
  from: searchCoinsApi
): searchCoinsModel => {
  return {
    ids: from.coins.reduce((ids, coin) => ids + `${coin.api_symbol},`, ""),
  };
};

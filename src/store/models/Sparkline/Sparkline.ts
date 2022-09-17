export type SparklineApi = {
  prices: number[][];
};

export type SparklineModel = { x: number; y: number }[];

export const normalizeSparkline = (from: SparklineApi): SparklineModel => {
  return from.prices.map((item) => ({ x: item[0], y: item[1] }));
};

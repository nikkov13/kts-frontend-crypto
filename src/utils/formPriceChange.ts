export const formPriceChange = (value: number, percents: number): string => {
  const sign: string = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(3)} (${percents.toFixed(2)}%)`;
};

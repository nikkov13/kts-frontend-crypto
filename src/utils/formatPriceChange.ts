import { formatPercent } from "./formatPercent";

export const formatPriceChange = (
  value: number,
  percent: number,
  fractionDigits: number = 3
): string => {
  const formattedValue = new Intl.NumberFormat("en-EN", {
    maximumFractionDigits: fractionDigits,
    signDisplay: "exceptZero",
  }).format(value);

  return `${formattedValue} (${formatPercent(percent, "never")})`;
};

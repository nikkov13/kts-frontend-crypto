export const formatPercent = (
  percent: number,
  signDisplay: "never" | "auto" | "always" | "exceptZero" = "exceptZero",
  fractionDigits: number = 2
): string => {
  return new Intl.NumberFormat("en-EN", {
    style: "percent",
    maximumFractionDigits: fractionDigits,
    signDisplay,
  }).format(percent / 100);
};

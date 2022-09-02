import rootStore from "@store/RootStore";

export const formatPrice = (
  value: number,
  fractionDigits: number = 2
): string => {
  const currency = rootStore.currentCurrency.currency;

  return new Intl.NumberFormat("en-EN", {
    style: "currency",
    maximumFractionDigits: fractionDigits,
    currency,
  }).format(value);
};

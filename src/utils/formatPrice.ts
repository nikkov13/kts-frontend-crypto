import rootStore from "@store/RootStore";

export const formatPrice = (
  value: number,
  fractionDigits: number = 2
): string => {
  const currency = rootStore.currentCurrency.currency;

  let formattedPrice: string;

  if (currency.length > 3) {
    const formattedNumber = new Intl.NumberFormat("en-EN", {
      maximumFractionDigits: fractionDigits,
    }).format(value);

    formattedPrice = `${currency.toUpperCase()}\xa0${formattedNumber}`;
  } else {
    formattedPrice = new Intl.NumberFormat("en-EN", {
      style: "currency",
      maximumFractionDigits: fractionDigits,
      currency,
    }).format(value);
  }

  return formattedPrice;
};

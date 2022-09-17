export const getChangeColor = (change: number): string => {
  let color = "";

  if (change !== 0) {
    color = change > 0 ? "green" : "red";
  }

  return color;
};

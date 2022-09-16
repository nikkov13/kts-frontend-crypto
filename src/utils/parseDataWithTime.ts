type ParsedData = {
  x: number;
  y: number;
};

export const parseDataWithTime = (
  price: number[],
  lastDate: string
): ParsedData[] => {
  const days = 7;
  const interval = (days * 24 * 60 * 60 * 1000) / price.length;
  const lastDateMil = Date.parse(lastDate);

  return price.map((y, i) => {
    const offset = interval * (price.length - i);
    const x = lastDateMil - offset;

    return { x, y };
  });
};

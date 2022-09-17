import { DAY_IN_MILLIS } from "@config/contants";

export enum TimeRanges {
  day = "24 H",
  week = "1 W",
  month = "1 M",
  quarter = "3 M",
  halfYear = "6 M",
  year = "1 Y",
  all = "All",
}

export const getMillisByRange = (
  range: TimeRanges
): { start: number; end: number } => {
  const end = Date.now();
  let start = end;

  switch (range) {
    case TimeRanges.day:
      start -= DAY_IN_MILLIS;
      break;
    case TimeRanges.week:
      start -= 7 * DAY_IN_MILLIS;
      break;
    case TimeRanges.month:
      start -= 30 * DAY_IN_MILLIS;
      break;
    case TimeRanges.quarter:
      start -= 91 * DAY_IN_MILLIS;
      break;
    case TimeRanges.halfYear:
      start -= 183 * DAY_IN_MILLIS;
      break;
    case TimeRanges.year:
      start -= 365 * DAY_IN_MILLIS;
      break;
    case TimeRanges.all:
      start = 0;
      break;
  }

  return {
    start: Math.round(start / 1000),
    end: Math.round(end / 1000),
  };
};

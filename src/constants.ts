import { Pattern, numArr, StatusMap, RL01Position } from "./types";

export const SPEED_INTERVAL: number = 250;
export const MAX_SPEED_LIMIT: number = 1000;

export const levels: numArr  = [1, 2];

export const initPattern: Pattern = {
  rows: 10,
  columns: 10,
};

export const STATUS: StatusMap  = {
    START: 'start',
    STOP: 'stop',
};

export const rl01InitPositoin: RL01Position = {
  start: 2,
  end: 3,
  direction: 'forward'
};

export const patternMap: numArr = (() => {
  const newPatternMap: numArr = [];
  for (let i = 10; i <= 30; i += 2) {
    newPatternMap.push(i);
  }

  return newPatternMap;
})();

import { cacheType } from "./../constants/types";
export function memoize<T extends (...args: any[]) => any>(fn: T) {
  let cache: cacheType = {};
  return (...args: Parameters<T>): ReturnType<T> => {
    const argsKey = JSON.stringify(args);
    if (argsKey in cache) return cache[argsKey];

    const result = fn(...args);
    cache[argsKey] = result;
    return result;
  };
}

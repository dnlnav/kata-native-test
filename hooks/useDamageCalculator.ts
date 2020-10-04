import { getTotalDamage } from "./../utils/damage";
import { filterZeroValues, sum } from "./../utils/arrayManipulation";
import { useState } from "react";
import { inventory, cacheType } from "../constants/types";
import { memoize } from "../utils/memo";

export const getPotionsUsed = (
  currentState: inventory,
  prevState: inventory | null
): number => {
  if (!prevState) return 0;
  const potionsUsed: inventory = prevState
    .map((potion, index) => potion - currentState[index])
    .filter(filterZeroValues);
  return potionsUsed.length;
};

export const getPossibleAttacks = (arr: inventory): inventory[] => {
  return arr
    .reduce(
      (acc, number) => {
        const elements0 = acc.map((v) => v + number);
        const elements1 = number > 0 ? acc.map((v) => v + (number - 1)) : [];
        return [...elements0, ...elements1];
      },
      [""]
    )
    .slice(1)
    .map((string) => string.split("").map((v) => parseInt(v)));
};

export const getMaximumDamage = (
  potionState: inventory,
  prevState: inventory | null = null
): number[] => {
  const possibleAttacks = getPossibleAttacks(potionState);
  const potionsUsed = getPotionsUsed(potionState, prevState);

  if (!possibleAttacks.length) return [potionsUsed];

  const maxChild = possibleAttacks
    .map((child) => memoizedGetMaximumDamage(child, potionState))
    .reduce((a, b) => (getTotalDamage(b) > getTotalDamage(a) ? b : a));

  return [...maxChild, potionsUsed]
    .filter(filterZeroValues)
    .sort((a, b) => b - a);
};

const memoizedGetMaximumDamage = memoize(getMaximumDamage);

export const useDamageCalculator = (
  initialState: inventory
): [number[], typeof setPotions] => {
  const [potions, setPotions] = useState<inventory>(initialState);
  return [getMaximumDamage(potions), setPotions];
};

import { filterZeroValues, sum } from "./../utils/arrayManipulation";
import { useState } from "react";
import { DAMAGE_TABLE } from "../constants/DamageTable";
import { inventory, cacheType } from "../constants/types";
import { memoize } from "../utils/memo";

export const getDamage = (
  currentState: inventory,
  prevState: inventory | null
): number => {
  if (!prevState) return 0;
  const potionsUsed: inventory = prevState
    .map((potion, index) => potion - currentState[index])
    .filter(filterZeroValues);
  return DAMAGE_TABLE[potionsUsed.length];
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
  const currentDamage = getDamage(potionState, prevState);

  if (!possibleAttacks.length) return [currentDamage];

  const maxChild = possibleAttacks
    .map((child) => memoizedGetMaximumDamage(child, potionState))
    .reduce((a, b) => (sum(b) > sum(a) ? b : a));

  return [...maxChild, currentDamage]
    .filter(filterZeroValues)
    .sort((a, b) => b - a);
};

const memoizedGetMaximumDamage = memoize(getMaximumDamage);

export const useDamageCalculator = (initialState: inventory) => {
  const [potions, setPotions] = useState<inventory>(initialState);
  return [getMaximumDamage(potions), setPotions];
};

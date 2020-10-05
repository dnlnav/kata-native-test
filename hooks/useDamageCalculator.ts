import { getTotalDamage } from "./../utils/damage";
import { filterZeroValues } from "./../utils/arrayManipulation";
import { useState } from "react";
import { potionInventory } from "../constants/types";
import { memoize } from "../utils/memo";

const memoizedGetAttacksForMaximumDamage = memoize(getAttacksForMaximumDamage);

function getMaxDamageNextAttacks(
  possibleNextStates: potionInventory[],
  currentState: potionInventory
) {
  return possibleNextStates
    .map((possibleState) =>
      memoizedGetAttacksForMaximumDamage(possibleState, currentState)
    )
    .reduce((a, b) => (getTotalDamage(b) > getTotalDamage(a) ? b : a));
}

export function getPotionsUsedNumber(
  currentState: potionInventory,
  prevState: potionInventory | null
): number {
  if (!prevState) return 0;
  const potionsUsed: potionInventory = prevState
    .map((potion, index) => potion - currentState[index])
    .filter(filterZeroValues);
  return potionsUsed.length;
}

export function getPossibleNexStates(
  currentState: potionInventory
): potionInventory[] {
  return currentState
    .reduce(
      (acc: potionInventory[], potionNumber: number) => {
        const potionNotUsedNumber = acc.map((v) => [...v, potionNumber]);
        const potionUsedNumber =
          potionNumber > 0 ? acc.map((v) => [...v, potionNumber - 1]) : [];
        return [...potionNotUsedNumber, ...potionUsedNumber];
      },
      [[]]
    )
    .slice(1);
}

export function getAttacksForMaximumDamage(
  currentPotionState: potionInventory,
  prevState: potionInventory | null = null
): number[] {
  const possibleNextStates = getPossibleNexStates(currentPotionState);
  const currentStatePotionsUsed = getPotionsUsedNumber(
    currentPotionState,
    prevState
  );

  if (!possibleNextStates.length) return [currentStatePotionsUsed];

  const maxDamageNextAttacks = getMaxDamageNextAttacks(
    possibleNextStates,
    currentPotionState
  );

  return [...maxDamageNextAttacks, currentStatePotionsUsed]
    .filter(filterZeroValues)
    .sort((a, b) => b - a);
}

export function useDamageCalculator(
  initialState: potionInventory
): [number[], typeof setPotions] {
  const [potions, setPotions] = useState<potionInventory>(initialState);
  return [getAttacksForMaximumDamage(potions), setPotions];
}

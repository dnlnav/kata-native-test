import { inventory } from "./../constants/types";
import { DAMAGE_TABLE } from "../constants/DamageTable";

interface attackStatus {
  numberOfPotions: number;
  damage: number;
  nextState: inventory;
}

export const getPossibleCombinations = (arr: inventory): inventory[] => {
  return arr
    .reduce(
      (acc, number) => {
        const elements0 = acc.map((v) => v + 0);
        const elements1 = number > 0 ? acc.map((v) => v + 1) : [];
        return [...elements0, ...elements1];
      },
      [""]
    )
    .slice(1)
    .map((string) => string.split("").map((v) => +v));
};

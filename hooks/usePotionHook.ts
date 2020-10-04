import { inventory } from "./../constants/types";
import InventoryNode from "../classes/InventoryNode";

const sum = (array: number[]): number =>
  array.reduce((acc, value) => acc + value);

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

export const getMaximumDamage = (potionState: InventoryNode): number[] => {
  getPossibleAttacks(potionState.state).forEach((possibleState) =>
    potionState.addChild(new InventoryNode(possibleState))
  );

  if (!potionState.children.length) return [potionState.getDamage()];

  const maxChild = potionState.children
    .map((child) => getMaximumDamage(child))
    .reduce((a, b) => (sum(b) > sum(a) ? b : a));

  return [...maxChild, potionState.getDamage()]
    .filter((number) => number > 0)
    .sort((a, b) => b - a);
};

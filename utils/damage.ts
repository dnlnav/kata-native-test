import { sum } from "./arrayManipulation";
interface damageTableType {
  [key: number]: number;
}

const DAMAGE_TABLE: damageTableType = {
  0: 0,
  1: 3,
  2: 5,
  3: 10,
  4: 20,
  5: 25,
};

export const getDamage = (potionsUsed: number) =>
  DAMAGE_TABLE[potionsUsed] ?? 0;

export const getTotalDamage = (potionsUsedPerAttack: number[]) =>
  sum(potionsUsedPerAttack.map(getDamage));

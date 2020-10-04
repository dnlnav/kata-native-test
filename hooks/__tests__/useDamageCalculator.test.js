import {
  getPossibleAttacks,
  getMaximumDamage,
  getDamage,
} from "../useDamageCalculator";

describe("getPossibleCombinations", () => {
  describe("given an array with potions", () => {
    describe("when the potions quatity is greater than 0", () => {
      test("returns all the possible attack combinations", () => {
        const testPotionArray = [2, 3, 1];
        const expectedCombinations = [
          [1, 3, 1],
          [2, 2, 1],
          [2, 3, 0],
          [1, 2, 1],
          [2, 2, 0],
          [1, 3, 0],
          [1, 2, 0],
        ];
        expect(getPossibleAttacks(testPotionArray).sort()).toEqual(
          expectedCombinations.sort()
        );
      });
    });
    describe("when one of the potion's quantity is 0", () => {
      test("return a 0 for that potion for all combinations", () => {
        const testPotionArray = [2, 0, 1];
        getPossibleAttacks(testPotionArray).forEach((combination) =>
          expect(combination[1]).toEqual(0)
        );
      });
    });
    describe("when there is no possible attacks", () => {
      test("returns an empty array", () => {
        const testPotionArray = [0, 0, 0];
        expect(getPossibleAttacks(testPotionArray)).toEqual([]);
      });
    });
  });
});

describe("getDamage", () => {
  describe("given an AttackNode", () => {
    test("return the damage produces on that attack", () => {
      const root = [1, 2, 1];
      const attackNode = [1, 1, 0];
      expect(getDamage(attackNode, root)).toEqual(5);
    });
  });
});

describe("getMaximumDamage", () => {
  describe("given an array with potions", () => {
    test("returns the damage per attack for the maximum damage", () => {
      const testPotionArray = [2, 2, 1, 1, 1];
      const expectedResult = [25, 3, 3];
      expect(getMaximumDamage(testPotionArray)).toEqual(expectedResult);
    });
  });
});

import {
  getNextPotionState,
  getPossibleCombinations,
} from "../damageCalculator";

describe("getPossibleCombinations", () => {
  describe("given an array with potions", () => {
    describe("when the potions quatity is greater than 0", () => {
      test("returns all the possible attack combinations", () => {
        const testPotionArray = [2, 3, 1];
        const expectedCombinations = [
          [1, 3, 1],
          [2, 2, 1],
          [1, 3, 0],
          [1, 2, 1],
          [2, 2, 0],
          [1, 3, 0],
          [1, 2, 0],
        ];
        expect(getPossibleCombinations(testPotionArray).sort()).toEqual(
          expectedCombinations.sort()
        );
      });
    });
    describe("when one of the potion's quantity is 0", () => {
      test("return a 0 for that potion for all combinations", () => {
        const testPotionArray = [2, 0, 1];
        getPossibleCombinations(testPotionArray).forEach((combination) =>
          expect(combination[1]).toEqual(0)
        );
      });
    });
  });
});

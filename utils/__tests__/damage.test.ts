import { describe, expect, test } from "@jest/globals";
import { getDamage } from "../damage";

describe("getDamage", () => {
  describe("given the number of potions used", () => {
    describe("when the potions used quantity is invalid or zero", () => {
      test("returns 0 damage", () => {
        expect(getDamage(6)).toEqual(0);
        expect(getDamage(-1)).toEqual(0);
        expect(getDamage(0)).toEqual(0);
      });
    });
  });
});

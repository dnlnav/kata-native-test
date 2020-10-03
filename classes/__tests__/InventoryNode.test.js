import InventoryNode from "../InventoryNode";

describe("getDamage", () => {
  describe("given an AttackNode", () => {
    test("return the damage produces on that attack", () => {
      const root = new InventoryNode([1, 2, 1]);
      const attackNode = new InventoryNode([1, 1, 0]);
      root.addChild(attackNode);
      expect(attackNode.getDamage()).toEqual(5);
    });
  });
});

import { DAMAGE_TABLE } from "./../constants/DamageTable";
import { inventory } from "./../constants/types";

export default class InventoryNode {
  parent: InventoryNode | null;
  children: InventoryNode[];
  state: inventory;

  constructor(state: inventory, parent = null) {
    this.parent = parent;
    this.children = [];
    this.state = state;
  }

  addChild(childNode: InventoryNode) {
    this.children = [...this.children, childNode];
    childNode.parent = this;
  }

  getPotionsUsed(): number {
    if (!this.parent) return 0;
    const potionsUsed: inventory = this.parent.state.map(
      (potion, index) => potion - this.state[index]
    );
    return potionsUsed.filter((quantity) => quantity > 0).length;
  }

  getDamage(): number {
    return DAMAGE_TABLE[this.getPotionsUsed()];
  }
}

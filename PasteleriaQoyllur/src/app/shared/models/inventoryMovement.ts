export interface InventoryMovement {
  id?: number;
  ingredientId: number;
  type: 'IN' | 'OUT';
  quantity: number;
  date: string;
  reason: string;
}

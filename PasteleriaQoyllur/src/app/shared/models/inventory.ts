export interface Inventory {
  id?: number;
  ingredientId: number;
  quantity: number;
  lastUpdate: string; // formato "YYYY-MM-DD"
}

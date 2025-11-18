export interface PurchaseDetails {
  id?: number;
  purchaseOrderId: number;
  ingredientId: number;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

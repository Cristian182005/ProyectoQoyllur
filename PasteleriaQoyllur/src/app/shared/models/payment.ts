export interface Payment {
  id: number;
  orderId: number;
  method: string;
  amount: number;
  status: string;
}

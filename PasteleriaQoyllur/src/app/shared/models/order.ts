import { OrderItem } from "./orderItem";

export interface Order {
  id?: number;
  customerId: number;
  date: string;
  total: number;
  items: OrderItem[];
}

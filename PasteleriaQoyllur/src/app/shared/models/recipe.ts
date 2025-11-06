import { Ingredient } from "./ingredient";

export interface Recipe {
  id: number;
  productId: number;
  ingredients: Ingredient[];
  instructions: string;
}

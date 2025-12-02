import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../services/inventory-service';
import { IngredientService } from '../../../ingredients/services/ingredient-service';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.html',
  standalone: false
})
export class InventoryList implements OnInit {

  inventory: any[] = [];
  ingredientsMap: Record<number, string> = {};

  constructor(
    private service: InventoryService,
    private ingredientService: IngredientService
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.ingredientService.getAll().subscribe(ings => {
      this.ingredientsMap = Object.fromEntries(
        ings.map(i => [i.id!, i.name])
      );

      this.service.getAll().subscribe(data => {
        this.inventory = data;
      });
    });
  }

  getIngredientName(id: number): string {
    return this.ingredientsMap[id] || 'N/A';
  }

  delete(id: number) {
    if (confirm('¿Eliminar registro de inventario?')) {
      this.service.delete(id).subscribe(() => {
        alert('Registro eliminado ✔');
        this.load();
      });
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { InventoryMovementService } from '../../services/inventory-movement-service';
import { IngredientService } from '../../../ingredients/services/ingredient-service';

@Component({
  selector: 'app-inventory-movement-list',
  templateUrl: './inventory-movement-list.html',
  standalone: false
})
export class InventoryMovementList implements OnInit {

  movements: any[] = [];
  ingredientMap: Record<number, string> = {};

  constructor(
    private movementService: InventoryMovementService,
    private ingredientService: IngredientService
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.ingredientService.getAll().subscribe(ings => {
      this.ingredientMap = Object.fromEntries(
        ings.map(i => [i.id!, i.name])
      );

      this.movementService.getAll().subscribe(data => {
        this.movements = data;
      });
    });
  }

  getIngredientName(id: number): string {
    return this.ingredientMap[id] || 'N/A';
  }

  delete(id: number) {
    if (confirm('¿Eliminar movimiento?')) {
      this.movementService.delete(id).subscribe(() => {
        alert('Movimiento eliminado ✔');
        this.load();
      });
    }
  }
}

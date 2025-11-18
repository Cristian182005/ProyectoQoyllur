import { Component, OnInit } from '@angular/core';
import { IngredientService } from '../../services/ingredient-service';
import { UnitService } from '../../../units/services/unit-service';
import { Router } from '@angular/router';
import { Units } from '../../../../shared/models/units';
import { Ingredients } from '../../../../shared/models/ingredients';

@Component({
  selector: 'app-ingredient-list',
  templateUrl: './ingredient-list.html',
  standalone: false,
})
export class IngredientList implements OnInit {
  ingredients: Ingredients[] = [];
  units: Units[] = [];

  constructor(
    private ingredientService: IngredientService,
    private unitService: UnitService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  // 🔥 Cargar ambos: ingredientes y unidades
  loadData(): void {
    this.ingredientService.getAll().subscribe((ings) => (this.ingredients = ings));
    this.unitService.getAll().subscribe((units) => (this.units = units));
  }

  // 🔥 Buscar el nombre o abreviatura de la unidad por ID
  getUnitName(unitId: any): string {
    const id = Number(unitId); // Convertir unitId a número

    const unit = this.units.find((u) => Number(u.id) === id);

    return unit ? `${unit.name} (${unit.abbreviation})` : 'N/A';
  }

  edit(i: Ingredients): void {
    this.router.navigate(['/ingredients/edit', i.id]);
  }

  remove(id: number): void {
    if (confirm('¿Eliminar ingrediente?')) {
      this.ingredientService.delete(id).subscribe(() => this.loadData());
    }
  }
}

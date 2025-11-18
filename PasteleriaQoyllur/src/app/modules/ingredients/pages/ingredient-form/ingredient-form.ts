import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IngredientService } from '../../services/ingredient-service';
import { UnitService } from '../../../units/services/unit-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Units } from '../../../../shared/models/units';
import { Ingredients } from '../../../../shared/models/ingredients';

@Component({
  selector: 'app-ingredient-form',
  templateUrl: './ingredient-form.html',
  standalone: false
})
export class IngredientForm implements OnInit {

  form!: FormGroup;
  isEdit = false;
  ingredientId?: number;
  units: Units[] = [];

  constructor(
    private ingredientService: IngredientService,
    private unitService: UnitService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.unitService.getAll().subscribe(data => this.units = data);

    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      unitId: new FormControl('', Validators.required),
      cost: new FormControl(0, [Validators.required, Validators.min(0)]),
      active: new FormControl(true)
    });

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEdit = true;
        this.ingredientId = Number(params['id']);
        this.load(this.ingredientId);
      }
    });
  }

  load(id: number): void {
    this.ingredientService.getById(id).subscribe(ing => this.form.patchValue(ing));
  }

  save(): void {
    if (this.form.invalid) return;

    const ingredient: Ingredients = this.form.value;

    const request = this.isEdit
      ? this.ingredientService.update({ ...ingredient, id: this.ingredientId })
      : this.ingredientService.create(ingredient);

    request.subscribe(() => {
      alert('Ingrediente guardado con éxito');
      this.router.navigate(['/ingredients']);
    });
  }
}

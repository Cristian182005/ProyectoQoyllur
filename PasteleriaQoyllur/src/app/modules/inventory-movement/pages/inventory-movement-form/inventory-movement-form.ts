import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InventoryMovementService } from '../../services/inventory-movement-service';
import { IngredientService } from '../../../ingredients/services/ingredient-service';
import { ActivatedRoute, Router } from '@angular/router';
import { InventoryMovement } from '../../../../shared/models/inventoryMovement';

@Component({
  selector: 'app-inventory-movement-form',
  templateUrl: './inventory-movement-form.html',
  standalone: false
})
export class InventoryMovementForm implements OnInit {

  form!: FormGroup;
  isEdit = false;
  id!: number;
  ingredients: any[] = [];

  constructor(
    private service: InventoryMovementService,
    private ingredientService: IngredientService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.form = new FormGroup({
      ingredientId: new FormControl('', Validators.required),
      type: new FormControl('IN', Validators.required),
      quantity: new FormControl(0, [Validators.required, Validators.min(0.01)]),
      date: new FormControl('', Validators.required),
      reason: new FormControl('', Validators.required)
    });

    this.ingredientService.getAll().subscribe(res => this.ingredients = res);

    this.route.params.subscribe(p => {
      if (p['id']) {
        this.isEdit = true;
        this.id = Number(p['id']);
        this.load();
      }
    });
  }

  load() {
    this.service.getById(this.id).subscribe(m => {
      this.form.patchValue(m);
    });
  }

  save() {
    if (this.form.invalid) return;

    const value = this.form.value;

    const movement: InventoryMovement = {
      ingredientId: Number(value.ingredientId),
      type: value.type,
      quantity: Number(value.quantity),
      date: value.date,
      reason: value.reason
    };

    const req = this.isEdit
      ? this.service.update({ ...movement, id: this.id })
      : this.service.create(movement);

    req.subscribe(() => {
      alert(this.isEdit ? 'Movimiento actualizado ✔' : 'Movimiento registrado ✔');
      this.router.navigate(['/inventory-movements']);
    });
  }
}

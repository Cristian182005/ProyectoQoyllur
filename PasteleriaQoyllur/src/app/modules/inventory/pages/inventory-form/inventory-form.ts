import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InventoryService } from '../../services/inventory-service';
import { IngredientService } from '../../../ingredients/services/ingredient-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Inventory } from '../../../../shared/models/inventory';

@Component({
  selector: 'app-inventory-form',
  templateUrl: './inventory-form.html',
  standalone: false
})
export class InventoryForm implements OnInit {

  form!: FormGroup;
  isEdit = false;
  id!: number;

  ingredients: any[] = [];

  constructor(
    private service: InventoryService,
    private ingredientService: IngredientService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.form = new FormGroup({
      ingredientId: new FormControl('', Validators.required),
      quantity: new FormControl(0, [Validators.required, Validators.min(0)]),
      lastUpdate: new FormControl('', Validators.required)
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
    this.service.getById(this.id).subscribe(item => {
      this.form.patchValue(item);
    });
  }

  save() {
    if (this.form.invalid) return;

    const value = this.form.value;

    const data: Inventory = {
      ingredientId: Number(value.ingredientId),
      quantity: Number(value.quantity),
      lastUpdate: value.lastUpdate
    };

    const req = this.isEdit
      ? this.service.update({ ...data, id: this.id })
      : this.service.create(data);

    req.subscribe(() => {
      alert(this.isEdit ? 'Inventario actualizado ✔' : 'Registro creado ✔');
      this.router.navigate(['/inventory']);
    });
  }
}

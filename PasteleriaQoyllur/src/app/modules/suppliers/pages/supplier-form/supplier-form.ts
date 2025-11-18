import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SupplierService } from '../../services/supplier-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Suppliers } from '../../../../shared/models/suppliers';

@Component({
  selector: 'app-supplier-form',
  templateUrl: './supplier-form.html',
  standalone: false
})
export class SupplierForm implements OnInit {

  form!: FormGroup;
  isEdit = false;
  supplierId?: number;

  constructor(
    private service: SupplierService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      contactName: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      email: new FormControl('', Validators.email),
      address: new FormControl(''),
      active: new FormControl(true)
    });

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEdit = true;
        this.supplierId = Number(params['id']);
        this.load(this.supplierId);
      }
    });
  }

  load(id: number): void {
    this.service.getById(id).subscribe(supp => this.form.patchValue(supp));
  }

  save(): void {
    if (this.form.invalid) return;

    const supplier: Suppliers = this.form.value;

    const request = this.isEdit
      ? this.service.update({ ...supplier, id: this.supplierId })
      : this.service.create(supplier);

    request.subscribe(() => {
      alert('Proveedor guardado con éxito');
      this.router.navigate(['/suppliers']);
    });
  }
}

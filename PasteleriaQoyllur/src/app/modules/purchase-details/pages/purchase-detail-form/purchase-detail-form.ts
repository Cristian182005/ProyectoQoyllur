import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PurchaseDetailService } from '../../services/purchase-detail-service';
import { IngredientService } from '../../../ingredients/services/ingredient-service';
import { PurchaseOrderService } from '../../../purchase-order/services/purchase-order-service';
import { PurchaseDetails } from '../../../../shared/models/purchaseDetails';

@Component({
  selector: 'app-purchase-detail-form',
  templateUrl: './purchase-detail-form.html',
  standalone: false,
})
export class PurchaseDetailForm implements OnInit {

  form!: FormGroup;
  isEdit = false;

  purchaseOrders: any[] = [];
  ingredients: any[] = [];
  detailId!: number;

  constructor(
    private service: PurchaseDetailService,
    private orderService: PurchaseOrderService,
    private ingredientService: IngredientService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.form = new FormGroup({
      purchaseOrderId: new FormControl('', Validators.required),
      ingredientId: new FormControl('', Validators.required),
      quantity: new FormControl(0, [Validators.required, Validators.min(0)]),
      unitPrice: new FormControl(0, [Validators.required, Validators.min(0)])
    });

    this.loadReferences();

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEdit = true;
        this.detailId = Number(params['id']);
        this.loadDetail();
      }
    });
  }

  loadReferences() {
    this.orderService.getAll().subscribe(res => this.purchaseOrders = res);
    this.ingredientService.getAll().subscribe(res => this.ingredients = res);
  }

  loadDetail() {
    this.service.getById(this.detailId).subscribe(detail => {
      this.form.patchValue(detail);
    });
  }

  save() {

    const value = this.form.value;

    const data: PurchaseDetails = {
      purchaseOrderId: Number(value.purchaseOrderId),
      ingredientId: Number(value.ingredientId),
      quantity: Number(value.quantity),
      unitPrice: Number(value.unitPrice),
      subtotal: Number(value.quantity) * Number(value.unitPrice)
    };

    const req = this.isEdit
      ? this.service.update({ ...data, id: this.detailId })
      : this.service.create(data);

    req.subscribe(() => {
      alert(this.isEdit ? 'Detalle actualizado ✔' : 'Detalle registrado ✔');
      this.router.navigate(['/purchase-details']);
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../services/customer-service';
import { Customer } from '../../../../shared/models/customer';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.html',
  standalone: false,
})
export class CustomerForm implements OnInit {
  customerForm!: FormGroup;
  isEditMode = false;
  customerId?: number;

  constructor(
    private service: CustomerService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.customerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', Validators.required),
    });

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.customerId = +params['id'];
        this.loadCustomer(this.customerId);
      }
    });
  }

  loadCustomer(id: number): void {
    this.service.getById(id).subscribe(customer => {
      this.customerForm.patchValue(customer);
    });
  }

  save(): void {
    if (this.customerForm.invalid) {
      alert('Por favor completa todos los campos.');
      return;
    }

    const formValue = this.customerForm.value;
    const customer: Customer = { ...formValue, id: this.customerId };

    const request = this.isEditMode
      ? this.service.update(customer)
      : this.service.create(customer);

    request.subscribe(() => {
      alert(this.isEditMode ? 'Cliente actualizado 🎉' : 'Cliente guardado con éxito 🎂');
      this.router.navigate(['/customers']);
    });
  }
}

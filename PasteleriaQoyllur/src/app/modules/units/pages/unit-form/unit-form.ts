import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UnitService } from '../../services/unit-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Units } from '../../../../shared/models/units';

@Component({
  selector: 'app-unit-form',
  templateUrl: './unit-form.html',
  standalone: false
})
export class UnitForm implements OnInit {

  form!: FormGroup;
  isEdit = false;
  unitId?: number;

  constructor(
    private service: UnitService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      abbreviation: new FormControl('', Validators.required)
    });

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEdit = true;
        this.unitId = Number(params['id']);
        this.load(this.unitId);
      }
    });
  }

  load(id: number): void {
    this.service.getById(id).subscribe(unit => this.form.patchValue(unit));
  }

  save(): void {
    if (this.form.invalid) return;

    const unit: Units = this.form.value;

    const request = this.isEdit
      ? this.service.update({ ...unit, id: this.unitId })
      : this.service.create(unit);

    request.subscribe(() => {
      alert('Unidad guardada con éxito');
      this.router.navigate(['/units']);
    });
  }
}

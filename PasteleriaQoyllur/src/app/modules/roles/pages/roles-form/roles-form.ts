import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RolesService } from '../../services/roles-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from '../../../../shared/models/role';

@Component({
  selector: 'app-roles-form',
  templateUrl: './roles-form.html',
  standalone: false
})
export class RolesForm implements OnInit {

  form!: FormGroup;
  isEdit = false;
  id!: number;

  constructor(
    private service: RolesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('')
    });

    this.route.params.subscribe(p => {
      if (p['id']) {
        this.isEdit = true;
        this.id = Number(p['id']);
        this.load();
      }
    });
  }

  load() {
    this.service.getById(this.id).subscribe(r => {
      this.form.patchValue(r);
    });
  }

  save() {
    if (this.form.invalid) return;

    const role: Role = this.form.value;

    const request = this.isEdit
      ? this.service.update({ ...role, id: this.id })
      : this.service.create(role);

    request.subscribe(() => {
      alert(this.isEdit ? 'Rol actualizado ✔' : 'Rol creado ✔');
      this.router.navigate(['/roles']);
    });
  }
}

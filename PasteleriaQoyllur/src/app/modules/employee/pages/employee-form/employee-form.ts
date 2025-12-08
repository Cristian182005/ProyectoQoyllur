import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee-service';
import { RolesService } from '../../../roles/services/roles-service';
import { Employee } from '../../../../shared/models/employee';
import { Users } from '../../../../shared/models/users';
import { Role } from '../../../../shared/models/role';
import { UsersHttpService } from '../../../auth/services/users-http-service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.html',
  standalone: false
})
export class EmployeeForm implements OnInit {

  employeeForm!: FormGroup;
  isEdit = false;
  id!: number;

  users: Users[] = [];
  roles: Role[] = [];

  constructor(
    private service: EmployeeService,
    private usersService: UsersHttpService,      // ✔ CAMBIO IMPORTANTE
    private roleService: RolesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.employeeForm = new FormGroup({
      fullName: new FormControl('', Validators.required),
      roleId: new FormControl('', Validators.required),
      userId: new FormControl('', Validators.required),
      active: new FormControl(true)
    });

    // ✔ CORRECTO: cargar usuarios desde UsersService (NO desde AuthService)
    this.usersService.getAll().subscribe(u => this.users = u);

    // ✔ cargar roles
    this.roleService.getAll().subscribe(r => this.roles = r);

    // ✔ modo edición
    this.route.params.subscribe(p => {
      if (p['id']) {
        this.isEdit = true;
        this.id = Number(p['id']);
        this.load();
      }
    });
  }

  load() {
    this.service.getById(this.id).subscribe(e => {
      this.employeeForm.patchValue(e);
    });
  }

  save() {
    const data: Employee = this.employeeForm.value;

    const request = this.isEdit
      ? this.service.update({ ...data, id: this.id })
      : this.service.create(data);

    request.subscribe(() => {
      alert('Empleado guardado!');
      this.router.navigate(['/employees']);
    });
  }
}

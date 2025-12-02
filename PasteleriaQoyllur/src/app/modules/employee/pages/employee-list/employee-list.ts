import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee-service';
import { RolesService } from '../../../roles/services/roles-service';
import { Users } from '../../../../shared/models/users';
import { Role } from '../../../../shared/models/role';
import { Employee } from '../../../../shared/models/employee';
import { UsersHttpService } from '../../../auth/services/users-http-service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.html',
  standalone: false
})
export class EmployeeList implements OnInit {

  employees: Employee[] = [];
  userMap: Record<number, string> = {};
  roleMap: Record<number, string> = {};

  constructor(
    private employeeService: EmployeeService,
    private userService: UsersHttpService,
    private roleService: RolesService
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {

    // 1️⃣ Cargar usuarios
    this.userService.getAll().subscribe((users: Users[]) => {

      this.userMap = Object.fromEntries(
        users.map(u => [u.id!, u.username])
      );

      // 2️⃣ Cargar roles
      this.roleService.getAll().subscribe((roles: Role[]) => {

        this.roleMap = Object.fromEntries(
          roles.map(r => [r.id!, r.name])
        );

        // 3️⃣ Cargar empleados
        this.employeeService.getAll().subscribe((emp: Employee[]) => {
          this.employees = emp;
        });

      });

    });
  }

  getUserName(id: number): string {
    return this.userMap[id] || 'Sin usuario';
  }

  getRoleName(id: number): string {
    return this.roleMap[id] || 'Sin rol';
  }

  delete(id: number): void {
    if (confirm('¿Eliminar empleado?')) {
      this.employeeService.delete(id).subscribe(() => {
        alert('Empleado eliminado ✔');
        this.load();
      });
    }
  }
}

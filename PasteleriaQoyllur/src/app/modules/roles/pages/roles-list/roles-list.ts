import { Component, OnInit } from '@angular/core';
import { RolesService } from '../../services/roles-service';
import { Role } from '../../../../shared/models/role';

@Component({
  selector: 'app-roles-list',
  templateUrl: './roles-list.html',
  standalone: false
})
export class RolesList implements OnInit {

  roles: Role[] = [];

  constructor(private service: RolesService) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.service.getAll().subscribe(data => this.roles = data);
  }

  delete(id: number) {
    if (confirm('¿Eliminar rol?')) {
      this.service.delete(id).subscribe(() => {
        alert('Rol eliminado ✔');
        this.load();
      });
    }
  }
}

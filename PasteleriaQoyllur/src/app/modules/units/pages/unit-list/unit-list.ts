import { Component, OnInit } from '@angular/core';
import { UnitService } from '../../services/unit-service';
import { Router } from '@angular/router';
import { Units } from '../../../../shared/models/units';

@Component({
  selector: 'app-unit-list',
  templateUrl: './unit-list.html',
  standalone: false
})
export class UnitList implements OnInit {

  units: Units[] = [];

  constructor(private service: UnitService, private router: Router) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.service.getAll().subscribe(data => this.units = data);
  }

  edit(u: Units): void {
    this.router.navigate(['/units/edit', u.id]);
  }

  remove(id: number): void {
    if (confirm('¿Eliminar unidad?')) {
      this.service.delete(id).subscribe(() => this.load());
    }
  }
}

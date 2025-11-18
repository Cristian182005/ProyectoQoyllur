import { Component, OnInit } from '@angular/core';
import { PurchaseDetailService } from '../../services/purchase-detail-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-purchase-detail-list',
  templateUrl: './purchase-detail-list.html',
  standalone: false,
})
export class PurchaseDetailList implements OnInit {

  details: any[] = [];

  constructor(
    private service: PurchaseDetailService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.service.getAll().subscribe(res => this.details = res);
  }

  edit(id: number) {
    this.router.navigate(['/purchase-details/edit', id]);
  }

  delete(id: number) {
    if (confirm('¿Eliminar este detalle?')) {
      this.service.delete(id).subscribe(() => {
        alert('Detalle eliminado');
        this.load();
      });
    }
  }
}

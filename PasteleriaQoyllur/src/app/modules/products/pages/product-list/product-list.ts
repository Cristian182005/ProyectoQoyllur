import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../shared/models/product';
import { ProductService } from '../../services/product-service';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.html',
  styles: ``,
})
export class ProductList implements OnInit {
  products: Product[] = [];

  constructor(private service: ProductService) {}

  ngOnInit(): void {
    this.service.getAll().subscribe(data => this.products = data);
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../services/category-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../../../shared/models/category';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.html',
  standalone: false,
})
export class CategoryForm implements OnInit {
  categoryForm!: FormGroup;
  isEditMode = false;
  categoryId?: number;

  constructor(
    private service: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.categoryForm = new FormGroup({
      name: new FormControl('', Validators.required),
    });

    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isEditMode = true;
        this.categoryId = Number(params['id']);
        this.loadCategory(this.categoryId);
      }
    });
  }

  loadCategory(id: number): void {
    this.service.getById(id).subscribe((category) => {
      this.categoryForm.patchValue(category);
    });
  }

  save(): void {
    if (this.categoryForm.invalid) {
      alert('Complete el formulario.');
      return;
    }

    const data: Category = {
      name: this.categoryForm.value.name!,
    };

    const request = this.isEditMode
      ? this.service.update({ ...data, id: this.categoryId })
      : this.service.create(data);

    request.subscribe(() => {
      if (this.isEditMode) {
        alert('Categoría actualizada 🔄');
        this.router.navigate(['/categories']);
      } else {
        alert('Categoría registrada 🎉');

        // 👇 Si venía desde productos, volver a productos
        const from = this.route.snapshot.queryParamMap.get('from');
        if (from === 'products') {
          this.router.navigate(['/products/new']);
        } else {
          this.router.navigate(['/categories']);
        }
      }
    });
  }
}

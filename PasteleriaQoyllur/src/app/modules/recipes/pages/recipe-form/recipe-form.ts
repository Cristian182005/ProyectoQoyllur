import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../../services/recipe-service';
import { ProductService } from '../../../products/services/product-service';
import { IngredientService } from '../../../ingredients/services/ingredient-service';
import { UnitService } from '../../../units/services/unit-service';
import { Product } from '../../../../shared/models/product';
import { forkJoin } from 'rxjs';
import { RecipeDetailService } from '../../../recipe-details/services/recipe-detail-service';
import { Ingredients } from '../../../../shared/models/ingredients';
import { Units } from '../../../../shared/models/units';
import { Recipes } from '../../../../shared/models/recipes';
import { RecipeDetails } from '../../../../shared/models/recipeDetails';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.html',
  standalone: false,
})
export class RecipeForm implements OnInit {
  recipeForm!: FormGroup;
  details!: FormArray;

  isEditMode = false;
  recipeId?: number;

  products: Product[] = [];
  ingredients: Ingredients[] = [];
  units: Units[] = [];

  constructor(
    private recipeService: RecipeService,
    private recipeDetailService: RecipeDetailService,
    private productService: ProductService,
    private ingredientService: IngredientService,
    private unitService: UnitService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Cargar datos necesarios
    forkJoin({
      prods: this.productService.getAll(),
      ings: this.ingredientService.getAll(),
      units: this.unitService.getAll(),
    }).subscribe((res) => {
      this.products = res.prods;
      this.ingredients = res.ings;
      this.units = res.units;
    });

    // Crear formulario
    this.recipeForm = new FormGroup({
      productId: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      details: new FormArray([]),
    });

    this.details = this.recipeForm.get('details') as FormArray;

    // Validar si es edición
    this.route.params.subscribe((p) => {
      if (p['id']) {
        this.isEditMode = true;
        this.recipeId = Number(p['id']);
        this.loadRecipe(this.recipeId);
      }
    });
  }

  // Crear grupo de detalle
  createDetail(): FormGroup {
    return new FormGroup({
      ingredientId: new FormControl('', Validators.required),
      quantity: new FormControl(0, [Validators.required, Validators.min(0.01)]),
    });
  }

  addDetail(): void {
    this.details.push(this.createDetail());
  }

  removeDetail(i: number): void {
    this.details.removeAt(i);
  }

  // Mostrar unidad según ingrediente
  getUnitName(ingredientId: any): string {
    const ingId = Number(ingredientId); // id del ingrediente como número
    const ing = this.ingredients.find((i) => Number(i.id) === ingId);
    if (!ing) return 'N/A';

    const unitId = Number((ing as any).unitId); // unitId como número
    const unit = this.units.find((u) => Number(u.id) === unitId);

    return unit ? unit.abbreviation : 'N/A';
  }

  // Cargar datos si es edición
  loadRecipe(id: number): void {
    forkJoin({
      recipe: this.recipeService.getById(id),
      details: this.recipeDetailService.getByRecipe(id),
    }).subscribe((res) => {
      this.recipeForm.patchValue({
        productId: res.recipe.productId,
        description: res.recipe.description,
      });

      res.details.forEach((d) => {
        this.details.push(
          new FormGroup({
            ingredientId: new FormControl(d.ingredientId),
            quantity: new FormControl(d.quantity),
          })
        );
      });
    });
  }

  // Guardar
  save(): void {
    if (this.recipeForm.invalid) {
      alert('Complete todos los campos');
      return;
    }

    const formValue = this.recipeForm.value;

    const recipeData: Recipes = {
      productId: Number(formValue.productId),
      description: formValue.description,
    };

    // Crear o actualizar receta
    const request = this.isEditMode
      ? this.recipeService.update({ ...recipeData, id: this.recipeId })
      : this.recipeService.create(recipeData);

    request.subscribe((recipeSaved) => {
      const recipeId = this.isEditMode ? this.recipeId! : recipeSaved.id!;

      // Borrar detalles anteriores si es edición
      if (this.isEditMode) {
        this.recipeDetailService.getByRecipe(recipeId).subscribe((existing) => {
          existing.forEach((d) => this.recipeDetailService.delete(d.id!).subscribe());
        });
      }

      // Guardar nuevos detalles
      this.details.controls.forEach((d) => {
        const det: RecipeDetails = {
          recipeId,
          ingredientId: Number(d.value.ingredientId),
          quantity: Number(d.value.quantity),
        };
        this.recipeDetailService.create(det).subscribe();
      });

      alert(this.isEditMode ? 'Receta actualizada 🍰' : 'Receta creada 🎉');
      this.router.navigate(['/recipes']);
    });
  }
}

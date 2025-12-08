import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../products/services/product-service';
import { CustomerService } from '../../../customers/services/customer-service';
import { OrderService } from '../../../orders/services/order-service';
import { CategoryService } from '../../../categories/services/category-service';
import { SupplierService } from '../../../suppliers/services/supplier-service';
import { RecipeService } from '../../../recipes/services/recipe-service';
import { InventoryService } from '../../../inventory/services/inventory-service';
import { AuthService } from '../../../auth/services/auth-service';
import { PurchaseOrderService } from '../../../purchase-order/services/purchase-order-service';
import { PurchaseDetailService } from '../../../purchase-details/services/purchase-detail-service';
import { IngredientService } from '../../../ingredients/services/ingredient-service';
import { RecipeDetailService } from '../../../recipe-details/services/recipe-detail-service';
import { UnitService } from '../../../units/services/unit-service';
import { InventoryMovementService } from '../../../inventory-movement/services/inventory-movement-service';
import { EmployeeService } from '../../../employee/services/employee-service';
import { UsersHttpService } from '../../../auth/services/users-http-service';
import { RolesService } from '../../../roles/services/roles-service';

@Component({
  selector: 'app-summary-cards',
  standalone: false,
  templateUrl: './summary-cards.html',
  styleUrls: ['./summary-cards.css'],
})
export class SummaryCards implements OnInit {

  roleId: number | null = null;

  // --- COMERCIAL ---
  totalProducts = 0;
  totalCategories = 0;
  totalCustomers = 0;
  totalOrders = 0;

  // --- COMPRAS ---
  totalSuppliers = 0;
  totalPurchaseOrders = 0;
  totalPurchaseDetails = 0;

  // --- PRODUCCIÓN ---
  totalIngredients = 0;
  totalUnits = 0;
  totalRecipes = 0;
  totalRecipeDetails = 0;

  // --- INVENTARIO ---
  totalInventory = 0;
  totalMovements = 0;

  // --- ACCESO ---
  totalEmployees = 0;
  totalUsers = 0;
  totalRoles = 0;

  constructor(
    private auth: AuthService,

    private productService: ProductService,
    private categoryService: CategoryService,
    private customerService: CustomerService,
    private orderService: OrderService,

    private supplierService: SupplierService,
    private purchaseOrderService: PurchaseOrderService,
    private purchaseDetailService: PurchaseDetailService,

    private ingredientService: IngredientService,
    private unitsService: UnitService,
    private recipeService: RecipeService,
    private recipeDetailService: RecipeDetailService,

    private inventoryService: InventoryService,
    private movementsService: InventoryMovementService,

    private employeeService: EmployeeService,
    private usersService: UsersHttpService,
    private roleService: RolesService
  ) {}

  ngOnInit(): void {

    this.roleId = this.auth.getRoleId();

    // --- COMERCIAL ---
    this.productService.getAll().subscribe(data => this.totalProducts = data.length);
    this.categoryService.getAll().subscribe(data => this.totalCategories = data.length);
    this.customerService.getAll().subscribe(data => this.totalCustomers = data.length);
    this.orderService.getAll().subscribe(data => this.totalOrders = data.length);

    // --- COMPRAS ---
    this.supplierService.getAll().subscribe(data => this.totalSuppliers = data.length);
    this.purchaseOrderService.getAll().subscribe(data => this.totalPurchaseOrders = data.length);
    this.purchaseDetailService.getAll().subscribe(data => this.totalPurchaseDetails = data.length);

    // --- PRODUCCIÓN ---
    this.ingredientService.getAll().subscribe(data => this.totalIngredients = data.length);
    this.unitsService.getAll().subscribe(data => this.totalUnits = data.length);
    this.recipeService.getAll().subscribe(data => this.totalRecipes = data.length);
    this.recipeDetailService.getAll().subscribe(data => this.totalRecipeDetails = data.length);

    // --- INVENTARIO ---
    this.inventoryService.getAll().subscribe(data => this.totalInventory = data.length);
    this.movementsService.getAll().subscribe(data => this.totalMovements = data.length);

    // --- ACCESO ---
    this.employeeService.getAll().subscribe(data => this.totalEmployees = data.length);
    this.usersService.getAll().subscribe(data => this.totalUsers = data.length);
    this.roleService.getAll().subscribe(data => this.totalRoles = data.length);
  }

  // Helpers para dashboard.html
  get isAdmin()      { return this.roleId === 1; }
  get isComercial()  { return this.roleId === 2; }
  get isCompras()    { return this.roleId === 3; }
  get isProduccion() { return this.roleId === 4; }
  get isInventario() { return this.roleId === 5; }
}

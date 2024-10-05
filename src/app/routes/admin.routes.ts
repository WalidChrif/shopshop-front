import { Routes } from '@angular/router';
import { AddProductComponent } from '../content/admin-content/add-product/add-product.component';
import { AdminHomeComponent } from '../content/admin-content/admin-home/admin-home.component';
import { CustomersComponent } from '../content/admin-content/customers/customers.component';
import { OrdersComponent } from '../content/admin-content/orders/orders.component';
import { ProductsComponent } from '../content/admin-content/products/products.component';
import { cancelGuard } from '../guards/cancel.guard';

export const adminRoutes: Routes = [
  { path: '', component: AdminHomeComponent, title: 'Admin Home' },
  { path: 'orders', component: OrdersComponent, title: 'Orders List' },
  { path: 'products', component: ProductsComponent, title: 'Products List' },
  { path: 'customers', component: CustomersComponent, title: 'Customers List' },
  {
    path: 'add-product',
    component: AddProductComponent,
    title: 'Add Product',
    canDeactivate: [cancelGuard],
  },
];

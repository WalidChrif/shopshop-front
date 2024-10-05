import { Routes } from '@angular/router';
import { AdminHomeComponent } from './content/admin-content/admin-home/admin-home.component';
import { OrdersComponent } from './content/admin-content/orders/orders.component';
import { PageNotFoundComponent } from './content/shared/page-not-found/page-not-found.component';
import { CheckoutComponent } from './content/user-content/checkout/checkout.component';
import { HomeComponent } from './content/user-content/home/home.component';
import { OrderHistoryComponent } from './content/user-content/order-history/order-history.component';
import { OrderReceiptComponent } from './content/user-content/order-receipt/order-receipt.component';
import { ProductDetailComponent } from './content/user-content/product-detail/product-detail.component';
import { ProductsListComponent } from './content/user-content/products-list/products-list.component';
import { ShoppingCartComponent } from './content/user-content/shopping-cart/shopping-cart.component';
import { CustomersComponent } from './content/admin-content/customers/customers.component';
import { ProductsComponent } from './content/admin-content/products/products.component';
import { AddProductComponent } from './content/admin-content/add-product/add-product.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent, title: 'ShopShop' },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'admin', component: AdminHomeComponent, title: 'Admin Home' },
  { path: 'admin/orders', component: OrdersComponent, title: 'Orders List' },
  {
    path: 'admin/products',
    component: ProductsComponent,
    title: 'Products List',
  },
  {
    path: 'admin/customers',
    component: CustomersComponent,
    title: 'Customers List',
  },
  {
    path: 'admin/add-product',
    component: AddProductComponent,
    title: 'Add Product',
  },
  {
    path: 'order-receipt/:tracking-number',
    component: OrderReceiptComponent,
    title: 'Order Receipt',
  },
  { path: 'orders', component: OrderHistoryComponent, title: 'Order History' },
  { path: 'checkout', component: CheckoutComponent, title: 'Checkout' },
  {
    path: 'shopping-cart',
    component: ShoppingCartComponent,
    title: 'Shopping cart',
  },
  {
    path: 'product-detail/:sku',
    component: ProductDetailComponent,
    title: 'Product Detail',
  },
  {
    path: 'products/category/:id',
    component: ProductsListComponent,
    title: 'ShopShop',
  },
  {
    path: 'products/search/:name',
    component: ProductsListComponent,
    title: 'ShopShop',
  },
  // {path: 'auth/login', component: LoginComponent, title: 'Login Page'},
  // {path: 'auth/signup', component: SignupComponent, title: 'SignUp Page'},
  { path: '**', component: PageNotFoundComponent, title: 'Page Not Found' },
];

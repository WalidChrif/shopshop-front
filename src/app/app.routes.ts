import { Routes } from '@angular/router';
import { LoginComponent } from './content/shared/login/login.component';
import { PageNotFoundComponent } from './content/shared/page-not-found/page-not-found.component';
import { SignupComponent } from './content/shared/signup/signup.component';
import { CheckoutComponent } from './content/user-content/checkout/checkout.component';
import { HomeComponent } from './content/user-content/home/home.component';
import { OrderHistoryComponent } from './content/user-content/order-history/order-history.component';
import { OrderReceiptComponent } from './content/user-content/order-receipt/order-receipt.component';
import { ProductDetailComponent } from './content/user-content/product-detail/product-detail.component';
import { ProductsListComponent } from './content/user-content/products-list/products-list.component';
import { ShoppingCartComponent } from './content/user-content/shopping-cart/shopping-cart.component';
import { CustomerGuard } from './guards/customer.guard';
import { AdminGuard } from './guards/admin.guard';
import { CancelGuard } from './guards/cancel.guard';
import { HomeGuard } from './guards/home.guard';

export const routes: Routes = [
  { path: 'home', component: HomeComponent, title: 'ShopShop', canActivate: [HomeGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'callback', component: HomeComponent, canActivate: [HomeGuard] },
  { path: 'signin', component: LoginComponent, title: 'Login' },
  { path: 'signup', component: SignupComponent, title: 'Sign Up' },
  {
    path: 'checkout',
    component: CheckoutComponent,
    canDeactivate: [CancelGuard],
    title: 'Checkout',
  },
  {
    path: 'shopping-cart',
    component: ShoppingCartComponent,
    title: 'Shopping Cart',
  },
  {
    path: 'product-detail/:sku',
    component: ProductDetailComponent,
    title: 'Product Detail',
  },
  {
    path: 'products/category/:id',
    component: ProductsListComponent,
    title: 'Category Products',
  },
  {
    path: 'products/search/:name',
    component: ProductsListComponent,
    title: 'Search Results',
  },
  {
    path: 'order-receipt/:tracking-number',
    component: OrderReceiptComponent,
    title: 'Order Receipt',
  },
  {
    path: 'orders',
    component: OrderHistoryComponent,
    title: 'Order History',
    canActivate: [CustomerGuard],
  },
  // Lazy load admin module
  {
    path: 'admin',
    loadChildren: () => import('./admin.routes').then((m) => m.adminRoutes),
    canActivate: [AdminGuard],
  },
  { path: '**', component: PageNotFoundComponent, title: 'Page Not Found' },
];

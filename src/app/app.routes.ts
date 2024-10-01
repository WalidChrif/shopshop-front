import { Routes } from '@angular/router';
import { ProductsListComponent } from './content/user-content/products-list/products-list.component';
import { ProductDetailComponent } from'./content/user-content/product-detail/product-detail.component';
import { PageNotFoundComponent } from './content/user-content/page-not-found/page-not-found.component';
import { HomeComponent } from         './content/user-content/home/home.component';
import { ShoppingCartComponent } from './content/user-content/shopping-cart/shopping-cart.component';
import { CheckoutComponent } from     './content/user-content/checkout/checkout.component';
import { OrderHistoryComponent } from './content/user-content/order-history/order-history.component';
import { OrderReceiptComponent } from './content/user-content/order-receipt/order-receipt.component';
import { AdminHomeComponent } from    './content/admin-content/admin-home/admin-home.component';

export const routes: Routes = [
  {path: 'home/admin', component: AdminHomeComponent, title: 'Admin Home'},
  { path: 'home', component: HomeComponent, title: 'ShopShop' },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
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

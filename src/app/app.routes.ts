import { Routes } from '@angular/router';
import { ProductsListComponent } from './user-content/products-list/products-list.component';
import { ProductDetailComponent } from './user-content/product-detail/product-detail.component';
import { PageNotFoundComponent } from './user-content/page-not-found/page-not-found.component';
import { HomeComponent } from './user-content/home/home.component';
import { ShoppingCartComponent } from './user-content/shopping-cart/shopping-cart.component';
import { CheckoutComponent } from './user-content/checkout/checkout.component';
import { OrderHistoryComponent } from './user-content/order-history/order-history.component';
import { OrderReceiptComponent } from './user-content/order-receipt/order-receipt.component';

export const routes: Routes = [
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

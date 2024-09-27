import { Routes } from '@angular/router';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { OrderReceiptComponent } from './components/order-receipt/order-receipt.component';

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

import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './content/shared/page-not-found/page-not-found.component';
import { CheckoutComponent } from './content/user-content/checkout/checkout.component';
import { HomeComponent } from './content/user-content/home/home.component';
import { OrderHistoryComponent } from './content/user-content/order-history/order-history.component';
import { OrderReceiptComponent } from './content/user-content/order-receipt/order-receipt.component';
import { ProductDetailComponent } from './content/user-content/product-detail/product-detail.component';
import { ProductsListComponent } from './content/user-content/products-list/products-list.component';
import { ShoppingCartComponent } from './content/user-content/shopping-cart/shopping-cart.component';
import { authGuard } from './guards/auth.guard';
import { cancelGuard } from './guards/cancel.guard';

export const routes: Routes = [
  { path: 'home', component: HomeComponent, title: 'ShopShop' },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'checkout',
    component: CheckoutComponent,
    canDeactivate: [cancelGuard],
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
    canActivate: [authGuard],
  },
  // Lazy load admin module
  {
    path: 'admin',
    loadChildren: () =>
      import('./routes/admin.routes').then((m) => m.adminRoutes),
    canActivate: [authGuard],
  },
  { path: '**', component: PageNotFoundComponent, title: 'Page Not Found' },
];

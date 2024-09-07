import { Routes } from '@angular/router';
import { MainContentComponent } from './components/main-content/main-content.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CheckoutPageComponent } from './components/checkout-page/checkout-page.component';

export const routes: Routes = [
    {path: 'home', component: MainContentComponent, title: 'ShopSHop'},
    {path: '',redirectTo: 'home', pathMatch: 'full'},
    {path: 'product/:sku', component: ProductDetailComponent, title: 'Product Detail'},
    {path: 'checkout', component: CheckoutPageComponent, title: 'Checkout Detail'}
];

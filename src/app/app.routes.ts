import { Routes } from '@angular/router';
import { MainContentComponent } from './components/main-content/main-content.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CheckoutPageComponent } from './components/checkout-page/checkout-page.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

export const routes: Routes = [
    {path: 'home', component: MainContentComponent, title: 'ShopSHop'},
    {path: '',redirectTo: 'home', pathMatch: 'full'},
    {path: 'product/:sku', component: ProductDetailComponent, title: 'Product Detail'},
    {path: 'checkout', component: CheckoutPageComponent, title: 'Checkout'},
    {path: 'category/:id', component: MainContentComponent, title: 'ShopShop'},
    {path: '**', component: PageNotFoundComponent, title: 'Page Not Found'},
];

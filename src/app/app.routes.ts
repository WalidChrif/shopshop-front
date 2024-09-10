import { Routes } from '@angular/router';
import { MainContentComponent } from './components/main-content/main-content.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CheckoutPageComponent } from './components/checkout-page/checkout-page.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent, title: 'ShopShop'},
    {path: '',redirectTo: '/home', pathMatch: 'full'},
    {path: 'products/category/:id', component: MainContentComponent, title: 'ShopShop'},
    {path: 'products/search/:name', component: MainContentComponent, title: 'ShopShop'},
    {path: 'product-detail/:sku', component: ProductDetailComponent, title: 'Product Detail'},
    {path: 'products/:sku/checkout', component: CheckoutPageComponent, title: 'Checkout'},
    {path: '**', component: PageNotFoundComponent, title: 'Page Not Found'},
];

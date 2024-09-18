import { Routes } from '@angular/router';
import { MainContentComponent } from './components/main-content/main-content.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent, title: 'ShopShop'},
    {path: '',redirectTo: '/home', pathMatch: 'full'},
    {path: 'auth/login', component: LoginComponent, title: 'Login Page'},
    {path: 'auth/signup', component: SignupComponent, title: 'SignUp Page'},
    {path: 'products/category/:id', component: MainContentComponent, title: 'ShopShop'},
    {path: 'products/search/:name', component: MainContentComponent, title: 'ShopShop'},
    {path: 'product-detail/:sku', component: ProductDetailComponent, title: 'Product Detail'},
    {path: 'shopping-cart', component: ShoppingCartComponent, title: 'Shopping cart'},
    {path: 'checkout', component: CheckoutComponent, title: 'Checkout'},
    {path: '**', component: PageNotFoundComponent, title: 'Page Not Found'},
];

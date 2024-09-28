import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { CartStatusComponent } from '../cart-status/cart-status.component';
import { UserInfoComponent } from '../user-info/user-info.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    UserInfoComponent,
    CartStatusComponent,
    NgIf,
    TranslateModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  itemsPrice = 0.0;
  totalItems = 0;
  lang: string = 'es';
  storage: Storage = localStorage;

  constructor(private router: Router, private translate: TranslateService) {}

  ngOnInit() {
    this.translate.use(this.storage.getItem('lang') || 'es');
  }
  searchProduct(productName: string) {
    if (productName.trim().length > 0) {
      this.router.navigate(['products', 'search', productName]);
    } else this.router.navigateByUrl('products/category/' + 1);
  }
  switchLanguage(lang: string) {
    // this.translate.use(this.translate.currentLang === 'en' ? 'es' : 'en');
    this.storage.setItem('lang', lang);
    this.translate.use(lang);
  }
}

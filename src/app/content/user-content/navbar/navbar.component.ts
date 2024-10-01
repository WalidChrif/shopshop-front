import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserInfoComponent } from '../user-info/user-info.component';
import { CartStatusComponent } from '../cart-status/cart-status.component';


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
  storage: Storage = sessionStorage;

  constructor(private router: Router, private translate: TranslateService) {}

  ngOnInit() {    
    this.translate.use(this.storage.getItem('lang') || 'en');
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

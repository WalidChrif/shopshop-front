import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { CartStatusComponent } from '../cart-status/cart-status.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIf, CartStatusComponent, TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {

  authenticated: boolean = false

  constructor(private route: ActivatedRoute
    , private router: Router) {}

    register() {
      this.router.navigate(['auth', 'register']);
    }
    login() {
      this.router.navigate(['auth', 'login']);
    }

  searchOnKeyup(productName: string) {
    if (productName.trim().length > 0) {
      this.router.navigate(['products', 'search', productName]);
    } else this.router.navigateByUrl('products/category/' + 1);
  }
  searchOnClick(productName: string) {
    this.router.navigate(['products', 'search', productName]);
  }
}

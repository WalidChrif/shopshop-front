import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header-desktop',
  standalone: true,
  imports: [],
  templateUrl: './search-navbar.component.html',
  styleUrl: './search-navbar.component.css',
})
export class SearchNavbarComponent {
  constructor(private route: ActivatedRoute, private router: Router) {}

  searchOnKeyup(productName: string) {
    if (productName.trim().length > 0) {
      this.router.navigate(['products', 'search', productName]);
    } else this.router.navigateByUrl('products/category/' + 1);
  }
  searchOnClick(productName: string) {
    this.router.navigate(['products', 'search', productName]);
  }
}

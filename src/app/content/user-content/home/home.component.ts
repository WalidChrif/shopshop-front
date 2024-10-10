import { JsonPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Product } from '../../../common/product';
import { User } from '../../../common/user';
import { JwtService } from '../../../services/jwt.service';
import { ProductService } from '../../../services/product.service';
import { AppState } from '../../../store';
import * as newAuthActions from '../../../store/new-auth.actions';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgClass, NgIf, NgFor, RouterLink, NgbCarouselModule, JsonPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  products: Product[] = [];
  user: User;

  constructor(
    private productService: ProductService,
    private jwtService: JwtService,
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private router: Router
  ) {}

  ngOnInit() {
    const code = this.route.snapshot.queryParamMap.get('code');
    if (code) {
       this.jwtService.exchangeCode(code).subscribe(
        (response) =>{
          this.user = this.jwtService.parseToken(response);
          this.store.dispatch(newAuthActions.login(this.user));
          this.router.navigate(['/']);
        }
      )

    }
    this.productService.findOneProductPerCategory().subscribe((response) => {
      this.products = response;
    });
  }
}

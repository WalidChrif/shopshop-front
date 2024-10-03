import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { Category } from '../../../common/category';
import { User } from '../../../common/user';
import { AppState } from '../../../store';

@Component({
  selector: 'app-category-menu',
  standalone: true,
  imports: [TranslateModule, RouterLink, NgIf, NgFor],
  templateUrl: './category-menu.component.html',
  styleUrl: './category-menu.component.css',
})
export class CategoryMenuComponent {
  user: User;

  categories: Category[] = [];

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.select('newAuthReducer').subscribe((res) => {
      this.user = res.user;
    });
  }
}

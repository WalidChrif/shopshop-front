import { Component } from '@angular/core';
import { Customer } from '../../../common/customer';
import { CustomerService } from '../../../services/customer.service';
import { NgFor, NgIf } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-customers-list',
  standalone: true,
  imports: [NgbPagination, NgIf, NgFor, RouterLink, TranslateModule],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent {
  customers : Customer[] = [];
  page = 1;
  pageSize = 10;
  totalItems = 0;

  constructor(private customerService : CustomerService) {}
  
  ngOnInit() {
    this.getCustomers();
  }
  getCustomers() {
    this.customerService
      .getCustomers(this.page - 1, this.pageSize)
      .subscribe((response) => {
        this.customers = response.content;
        this.page = response.number + 1;
        this.pageSize = response.size;
        this.totalItems = response.totalElements;
      });
  }

}

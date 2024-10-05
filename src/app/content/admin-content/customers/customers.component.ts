import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { Customer } from '../../../common/customer';
import { CustomerService } from '../../../services/customer.service';

@Component({
  selector: 'app-customers-list',
  standalone: true,
  imports: [FormsModule, NgbPagination, NgIf, NgFor, RouterLink, TranslateModule],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent {
  customers : Customer[] = [];
  page = 1;
  pageSize = 10;
  totalElements = 0;
  orderBy = 'firstName,asc';

  constructor(private customerService : CustomerService) {}
  
  ngOnInit() {
    this.getCustomers();
  }
  getCustomers() {
    this.customerService
      .getCustomers(this.page - 1, this.pageSize, this.orderBy)
      .subscribe((response) => {
        this.customers = response.content;
        this.page = response.number + 1;
        this.pageSize = response.size;
        this.totalElements = response.totalElements;
      });
  }

}

import { Component } from '@angular/core';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Purchase } from '../../common/purchase';
import { State } from '../../common/state';
import { Country } from '../../common/country';
import { User } from '../../common/user';
import { CheckoutService } from './../../services/checkout.service';
import { CartService } from '../../services/cart.service';
import { FormService } from '../../services/form.service';
import { AppState } from '../../store';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    NgbPopover,
    ReactiveFormsModule,
    FormsModule,
    NgFor,
    NgIf,
    CurrencyPipe,
    TranslateModule
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent {
  theForm!: FormGroup;
  totalPrice!: number;
  itemsPrice!: number;
  totalItems!: number;
  sameAddress = false;
  years: number[] = [];
  months: string[] = [];
  countries: Country[] = [];
  shippingStates: State[] = [];
  billingStates: State[] = [];
  purchase!: Purchase;
  trackingNumber: string;
  shippingCost = 4.99;
  user: User;

  constructor(
    private formService: FormService,
    private cartService: CartService,
    private checkoutService: CheckoutService,
    private store: Store<AppState>,
    private router: Router
  ) {}

  ngOnInit() {
    this.store
      .select('newAuthReducer')
      .subscribe((authState) => (this.user = authState.user));
    this.createForm();
    this.getCountries();
    this.getYears();
    this.refreshMonths();
    this.updateTotals();
    this.shippingCost = this.cartService.shippingCost;
  }
  onSubmit() {   
    this.purchase = new Purchase(
      this.theForm.value.customer,
      this.totalPrice,
      this.totalItems,
      this.cartService.shippingCost,
      this.theForm.value.shippingAddress,
      this.theForm.value.billingAddress,
      this.cartService.cartProducts
    );
    this.checkoutService
      .placeOrder(this.purchase)
      .subscribe((response) => {
        this.trackingNumber = response.trackingNumber;
        this.cartService.clearCart();
        this.router.navigate(['/order-receipt', this.trackingNumber]);
      });
  }

  createForm() {
    this.theForm = new FormGroup({
      customer: new FormGroup({
        firstName: new FormControl(this.user?.firstName, [
          Validators.required,
          Validators.pattern('[a-zA-Z]{4,20}'),
        ]),
        lastName: new FormControl(this.user?.lastName, [
          Validators.required,
          Validators.pattern('[a-zA-Z]{4,20}'),
        ]),
        email: new FormControl(this.user?.email, [
          Validators.required,
          Validators.email,
          Validators.maxLength(30),
        ]),
      }),
      shippingAddress: new FormGroup({
        country: new FormControl('', [Validators.required]),
        street: new FormControl('', [
          Validators.required,
          Validators.pattern("[a-zA-Z0-9.,' ]{3,64}"),
        ]),
        city: new FormControl('', [
          // Validators.required,
          Validators.pattern('[a-zA-Z ]{3,20}'),
        ]),
        state: new FormControl('', [Validators.required]),
        zipcode: new FormControl('', [Validators.pattern('[0-9]{5}')]),
      }),
      billingAddress: new FormGroup({
        country: new FormControl('', [Validators.required]),
        street: new FormControl('', [
          Validators.required,
          Validators.pattern("[a-zA-Z0-9.,' ]{3,64}"),
        ]),
        city: new FormControl('', [
          // Validators.required,
          Validators.pattern('[a-zA-Z ]{3,20}'),
        ]),
        state: new FormControl('', [Validators.required]),
        zipcode: new FormControl('', [Validators.pattern('[0-9]{5}')]),
      }),
      creditCard: new FormGroup({
        creditCardType: new FormControl('', [Validators.required]),
        creditCardName: new FormControl('', [
          Validators.required,
          Validators.pattern('[a-zA-Z ]{5,25}'),
        ]),
        creditCardNumber: new FormControl('', [
          Validators.required,
          Validators.pattern('[0-9]{16}'),
        ]),
        creditCardCCV: new FormControl('', [
          Validators.required,
          Validators.pattern('[0-9]*'),
          Validators.maxLength(3),
        ]),
        creditCardExpYear: new FormControl('', [Validators.required]),
        creditCardExpMonth: new FormControl('', [Validators.required]),
      }),
    });
  }

  copyAddress(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.theForm
        .get('billingAddress')
        ?.setValue(this.theForm.get('shippingAddress')?.value);
      this.billingStates = this.shippingStates;
      this.sameAddress = true;
    } else {
      this.sameAddress = false;
      this.theForm.get('billingAddress')?.reset();
    }
  }

  refreshStates(address: string) {
    this.formService
      .getStates(this.theForm.get(`${address}`)?.value.country)
      .subscribe((states) => {
        if (address === 'shippingAddress') this.shippingStates = states;
        else this.billingStates = states;
      });
  }
  getCountries() {
    this.formService.getCountries().subscribe((countries) => {
      this.countries = countries;
    });
  }
  getYears() {
    this.years = this.formService.getYears();
  }

  refreshMonths() {
    const months: string[] = [];
    const theYear = this.theForm.get('creditCard')?.value.creditCardExpYear;
    const currentYear = new Date().getFullYear();
    let startMonth = 0;
    if (currentYear == theYear || theYear == '')
      startMonth = new Date().getMonth();
    for (startMonth; startMonth < 12; startMonth++) {
      months.push(
        new Date(0, startMonth).toLocaleString('default', { month: 'long' })
      );
    }
    this.months = months;
  }
  updateTotals() {
    this.totalPrice = this.cartService.totalPrice.value;
    this.itemsPrice = this.cartService.itemsPrice.value;
    this.totalItems = this.cartService.totalItems.value;
  }
}

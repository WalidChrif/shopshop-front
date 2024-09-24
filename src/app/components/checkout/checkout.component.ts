import { Purchase } from '../../common/purchase';
import { CheckoutService } from './../../services/checkout.service';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { State } from '../../common/state';
import { Country } from '../../common/country';
import { FormService } from '../../services/form.service';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [NgbPopover, ReactiveFormsModule, FormsModule, NgFor, NgIf, CurrencyPipe],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent {
  theForm!: FormGroup;
  totalPrice!: number;
  itemsPrice!: number;
  totalQuantity!: number;
  sameAddress = false;
  years: number[] = [];
  months: string[] = [];
  countries: Country[] = [];
  shippingStates: State[] = [];
  billingStates: State[] = [];
  purchase!: Purchase;
  trackingNumber!: string;
  shippingCost = 4.99;

  constructor(
    private formService: FormService,
    private cartService: CartService,
    private checkoutService: CheckoutService,
    private router : Router,

  ) {}

  ngOnInit() {
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
      { totalPrice: this.totalPrice, totalQuantity: this.totalQuantity },
      this.theForm.value.shippingAddress,
      this.theForm.value.billingAddress,
      this.cartService.cartProducts
    );
    this.checkoutService
      .placeOrder(this.purchase)
      .subscribe((trackingNumber) => {
        this.trackingNumber = trackingNumber;
        // this.router.navigate(['/order-confirmation', this.trackingNumber]);
      });
   
  }

  createForm() {
    this.theForm = new FormGroup({
      customer: new FormGroup({
        firstName: new FormControl('', [
          Validators.required,
          Validators.pattern('[a-zA-Z]{4,20}'),
        ]),
        lastName: new FormControl('', [
          Validators.required,
          Validators.pattern('[a-zA-Z]{4,20}'),
        ]),
        email: new FormControl('', [
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
    this.totalQuantity = this.cartService.totalQuantity.value;
  }
}

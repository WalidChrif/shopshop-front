import { Address } from './address';
import { CartItem } from './cart-item';
import { Customer } from './customer';
import { Order } from './order';

export class Purchase {
  customer: Customer;
  totalPrice: number;
  totalItems: number;
  shippingCost: number;
  shippingAddress: Address;
  billingAddress: Address;
  orderItems: CartItem[];

  constructor(
    customer: Customer,
    totalPrice: number,
    totalItems: number,
    shippingCost: number,
    shippingAddress: Address,
    billingAddress: Address,
    orderItems: CartItem[]
  ) {
    this.customer = customer;
    this.totalPrice = totalPrice;
    this.totalItems = totalItems;
    this.shippingCost = shippingCost;
    this.shippingAddress = shippingAddress;
    this.billingAddress = billingAddress;
    this.orderItems = orderItems;
  }
}

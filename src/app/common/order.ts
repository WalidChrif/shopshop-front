import { Address } from "./address";
import { CartItem } from "./cart-item";
import { Customer } from "./customer";

export class Order{
    trackingNumber: string;
    customer: Customer;
    totalPrice: number;
    totalItems: number;
    shippingCost : number;
    shippingAddress: Address;
    dateCreated: Date;
    status: string;
    orderItems: CartItem[];
  
    constructor(
      trackingNumber: string,
      customer: Customer,
      totalPrice: number,
      totalItems: number,
      shippingCost: number,
      shippingAddress: Address,
      dateCreated: Date,
      status : string,
      orderItems: CartItem[]
    ) {
      this.trackingNumber = trackingNumber;
      this.customer = customer;
      this.totalPrice = totalPrice;
      this.totalItems = totalItems;
      this.shippingCost = shippingCost;
      this.shippingAddress = shippingAddress;
      this.dateCreated = dateCreated;
      this.status = status;
      this.orderItems = orderItems;
    }
}
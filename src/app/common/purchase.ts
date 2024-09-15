import { Address } from './address';
import { CartItem } from './cart-item';
import { Customer } from './customer';
import { Order } from './order';
export class Purchase {

    customer : Customer;
    order : Order; 
    shippingAddress : Address;
    billingAddress : Address;
    orderItems : CartItem[];


    // constructor() {}
    constructor(customer : Customer, order : Order, shippingAddress : Address, billingAddress : Address, orderItems : CartItem[]) {
        this.customer = customer;
        this.order = order;
        this.shippingAddress = shippingAddress;
        this.billingAddress = billingAddress;
        this.orderItems = orderItems;
    }

}

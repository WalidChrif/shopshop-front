import { Address } from './address';
import { CartItem } from './cart-item';
import { Customer } from './customer';
import { Order } from './order';
export interface Purchase {

    customer : Customer;
    order : Order; 
    shippingAddress : Address;
    billingAddress : Address;
    orderItems : CartItem[];

}

import { Product } from './product';

export class CartItem {
  sku: string;
  name: string;
  unitPrice: number;
  imageUrl: string;
  quantity: number;
  unitsInStock: number;

  constructor(product: Product) {
    this.sku = product.sku;
    this.name = product.name;
    this.unitPrice = product.unitPrice;
    this.imageUrl = product.imageUrl;
    this.unitsInStock = product.unitsInStock;
    this.quantity = 1; // Default quantity is 1 for now.
  }
}

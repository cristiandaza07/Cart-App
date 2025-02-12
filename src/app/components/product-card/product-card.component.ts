import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'product-card',
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
})
export class ProductCardComponent {
  @Input() product!: Product;

  quantity: number = 0;

  @Output() quantityEventEmitter: number = 0;

  @Output() productDataEvenEmitter: EventEmitter<{ product: Product, quantity: number }> = new EventEmitter();

  onAddCart(product: Product, quantity: number) {
    this.productDataEvenEmitter.emit({ product: product, quantity: quantity });
  }

  incrementQuantity() {
    if (this.quantity < this.product.stock) {
      this.quantity++;
    }
  }

  decrementQuantity() {
    if (this.quantity>0) {
      this.quantity--;
    }
  }
}

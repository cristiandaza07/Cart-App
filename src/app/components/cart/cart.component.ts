import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CartItem } from '../../models/cartItem';

@Component({
  selector: 'cart',
  imports: [],
  templateUrl: './cart.component.html'
})
export class CartComponent /*implements OnChanges*/{
  
  @Input() items: CartItem[] = [];
  @Input() total: number = 0;
  
  @Output() idProductEventEmitter = new EventEmitter();
  
  onDeleteCart(id: number){
    this.idProductEventEmitter.emit(id);
  }
  
  // ngOnChanges(changes: SimpleChanges): void {
  //   let itemsChanges = changes['items'];
  //   this.calculateTotal();
  //   this.saveSession();
    
  // }

  // calculateTotal():void {
  //   //utilizamos la función reduce para calcular el total
  //   this.total = this.items.reduce( (acumulator, item) => acumulator + item.quantity * item.product.price, 0);
  // }

  // saveSession():void{
  //   sessionStorage.setItem('cart', JSON.stringify(this.items));
  // }
}

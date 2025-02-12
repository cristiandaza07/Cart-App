import { EventEmitter, Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class SharingDataService {
  private _idProductEventEmitter: EventEmitter<number> = new EventEmitter();

  private _productEventEmitter: EventEmitter<Product> = new EventEmitter();

  private _productDataEvenEmitter: EventEmitter<{ product: Product, quantity: number }> = new EventEmitter();

  constructor() {}

  get productEventEmitter(): EventEmitter<Product> {
    return this._productEventEmitter;
  }

  get idProductEventEmitter(): EventEmitter<number> {
    return this._idProductEventEmitter;
  }

  get productDataEvenEmitter(): EventEmitter<{ product: Product, quantity: number }>{
    return this._productDataEvenEmitter;
  }
}

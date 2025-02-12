import { Component, OnInit} from '@angular/core';
import { Product } from '../../models/product';
import { ProductCardComponent } from '../product-card/product-card.component';
import { SharingDataService } from '../../services/sharing-data.service';
import { ProductService } from '../../services/product.service';
import { Store } from '@ngrx/store';
import { findAll, load } from '../../store/products.action';

@Component({
  selector: 'catalog',
  imports: [ProductCardComponent],
  templateUrl: './catalog.component.html'
})
export class CatalogComponent implements OnInit{
  products!: Product[];

  constructor(
    private store: Store<{products: any}>,
    private productService: ProductService,
    private sharingDataService: SharingDataService)
  {
    this.store.select('products').subscribe(state => this.products = state.products)
  }

  ngOnInit(): void {
    this.store.dispatch(load());
    //this.products = this.productService.findAll(); 
  }

  onAddCart(productData: { product: Product, quantity: number }){
    this.sharingDataService.productDataEvenEmitter.emit(productData);
  }

  
}

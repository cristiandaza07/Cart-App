import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CatalogComponent } from '../catalog/catalog.component';
import { CartItem } from '../../models/cartItem';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router, RouterOutlet } from '@angular/router';
import { SharingDataService } from '../../services/sharing-data.service';
import Swal from 'sweetalert2'
import { Store } from '@ngrx/store';
import { ItemsState } from '../../store/items.reducer';
import { add, remove, total } from '../../store/items.action';


@Component({
  selector: 'cart-app',
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './cart-app.component.html',
})
export class CartAppComponent implements OnInit {

  items: CartItem[] = [];

  constructor(
    private store: Store<{items: ItemsState}>,
    private sharingDataService: SharingDataService,
    private router: Router
  ) {
    this.store.select('items').subscribe(state => {

      this.items = state.items;
      this.saveSession();
      console.log('cambió el estado');
    })
  }

  ngOnInit(): void {
    this.store.dispatch(total());
    this.onDeleteCart();
    this.onAddCart();
  }

  onAddCart(): void {
    this.sharingDataService.productDataEvenEmitter.subscribe(productData => {
      const { product, quantity } = productData;
      this.store.dispatch(add({product, quantity }));
      this.store.dispatch(total());

      this.router.navigate(['/carrito']);

      Swal.fire({
        title: "Exito",
        text: "¡Nuevo producto agregado al carrito!",
        icon: "success"
      });
    })

  }

  onDeleteCart(): void {
    this.sharingDataService.idProductEventEmitter.subscribe((id) => {
      console.log(id + ': Se ha ejecutadoe el evento');

      Swal.fire({
        title: "¿Estás seguro de eliminar?",
        text: "El producto se eliminará del carrito de compras",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Eliminar"
      }).then((result) => {
        if (result.isConfirmed) {

          this.store.dispatch(remove({ id }));
          this.store.dispatch(total());
    
          this.router.navigate(['/carrito']);  

          Swal.fire({
            title: "Eliminado!",
            text: "Se ha eliminado el producto",
            icon: "success"
          });
        }
      });

    });
  }

  saveSession(): void {
    sessionStorage.setItem('cart', JSON.stringify(this.items));
  }
}

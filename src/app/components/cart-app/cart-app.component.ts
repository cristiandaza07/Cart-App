import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CatalogComponent } from '../catalog/catalog.component';
import { CartItem } from '../../models/cartItem';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router, RouterOutlet } from '@angular/router';
import { SharingDataService } from '../../services/sharing-data.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'cart-app',
  imports: [CatalogComponent, NavbarComponent, RouterOutlet],
  templateUrl: './cart-app.component.html',
})
export class CartAppComponent implements OnInit {

  items: CartItem[] = [];

  total: number = 0;

  constructor(
    private sharingDataService: SharingDataService,
    private service: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.items = JSON.parse(sessionStorage.getItem('cart')!) || [];
    this.calculateTotal();
    this.onDeleteCart();
    this.onAddCart();
  }

  onAddCart(): void {
    this.sharingDataService.productEventEmitter.subscribe(product =>{

      const hasItem = this.items.find((item) => {
        return item.product.id === product.id;
      });
  
      if (hasItem) {
        this.items = this.items.map((item) => {
          if (item.product.id === product.id) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
      } else {
        this.items = [...this.items, { product: { ...product }, quantity: 1 }];
      }
      this.saveSession();
      this.calculateTotal();
      this.router.navigate(['/carrito'], {
        state: {items: this.items, total: this.total}
      })

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

          this.items = this.items.filter((item) => item.product.id !== id);
          this.saveSession();
          this.calculateTotal();
    
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            this.router.navigate(['/carrito'], {
              state: {items: this.items, total: this.total}
            })
          })  

          Swal.fire({
            title: "Eliminado!",
            text: "Se ha eliminado el producto",
            icon: "success"
          });
        }
      });

    });
  }

  calculateTotal(): void {
    //utilizamos la función reduce para calcular el total
    this.total = this.items.reduce(
      (acumulator, item) => acumulator + item.quantity * item.product.price,
      0
    );
  }

  saveSession(): void {
    sessionStorage.setItem('cart', JSON.stringify(this.items));
  }
}

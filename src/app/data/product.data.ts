import { Product } from "../models/product";

export const products: Product[] = [
  {
    id: 1,
    name: 'Bicicleta',
    description: 'Bicicleta todo terreno profesional',
    price: 600,
    img: 'bicicleta.webp',
    stock: 3,
  },
  {
    id: 2,
    name: 'Celular iPhone 13',
    description: 'Celular de la marca Appel del año 2019',
    price: 930,
    img: 'iPhone13.webp',
    stock: 4,
  },
  {
    id: 3,
    name: 'Teclado Asus',
    description: 'Teclado gamer enfocado en videojuegos y con luces RGB',
    price: 200,
    img: 'teclado.webp',
    stock: 2,
  },
  {
    id: 4,
    name: 'Portatil Hp',
    description: 'Computador portatil HP ProBook enfocado para tareas basicas',
    price: 800,
    img: 'portatil.webp',
    stock: 5,
  },
  {
    id: 5,
    name: 'Casco',
    description: 'Casco para bicicleta',
    price: 30,
    img: 'casco.webp',
    stock: 11,
  },
  {
    id: 6,
    name: 'Lampara',
    description:
      'Lampara para escritorio perfecta para hacer diversas tareas con una luz tenue',
    price: 50,
    img: 'lampara.webp',
    stock: 6
  },
];

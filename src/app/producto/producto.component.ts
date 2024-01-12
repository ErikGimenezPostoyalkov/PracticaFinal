import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Router } from '@angular/router';

interface Producto {
  nombre: string;
  precio: string;
  categoria: string;
  talla: string;
  quantity: number;
  enlace: string;
}

@Component({
  selector: 'app-producto',
  standalone: true,
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  public producto: Producto = { nombre: '', precio: '', categoria: '', talla: '', quantity: 1, enlace: ''};

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const nombreProducto = params.get('nombre');
      if (nombreProducto) {
        this.obtenerProductoPorNombre(nombreProducto);
      }
    });
  }

  obtenerProductoPorNombre(nombre: string) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3000/Categorias', true);

    xhr.onload = () => {
      if (xhr.status === 200) {
        const categorias: string[] = JSON.parse(xhr.responseText);

        this.obtenerProductoPorCategorias(nombre, categorias);
      } else {
        console.error('Error al obtener las categorías:', xhr.statusText);
      }
    };

    xhr.onerror = () => {
      console.error('Error de red al obtener las categorías.');
    };

    xhr.send();
  }

  obtenerProductoPorCategorias(nombre: string, categorias: string[]) {
    const obtenerProducto = (categoria: string) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', `http://localhost:3000/productos/${categoria}`, true);

      xhr.onload = () => {
        if (xhr.status === 200) {
          const productos: any[] = JSON.parse(xhr.responseText);

          const productoEncontrado = productos.find(producto => producto.nombre === nombre);

          if (productoEncontrado) {
            this.producto = {
              nombre: productoEncontrado.nombre,
              precio: productoEncontrado.precio.toString(),
              categoria: productoEncontrado.categoria,
              talla: 'L',
              quantity: 1,
              enlace: productoEncontrado.enlace
            };
          }
        } else {
          console.error(`Error al obtener los datos de la categoría ${categoria}:`, xhr.statusText);
        }
      };

      xhr.onerror = () => {
        console.error(`Error de red al obtener los datos de la categoría ${categoria}.`);
      };

      xhr.send();
    };

    for (const categoria of categorias) {
      obtenerProducto(categoria);
    }
  }

  irAHome() {
    this.router.navigate(['/home']);
  }

  irABuscador() {
    this.router.navigate(['/buscador']);
  }

  addToCart() {
    const selectedProducto = this.producto;
    const mensaje = `Has comprado ${selectedProducto.quantity} unidades de ${selectedProducto.nombre} talla ${selectedProducto.talla} al carrito.`;
    alert(mensaje);
    }

  updateQuantity(event: Event) {
    this.producto.quantity = parseInt((event.target as HTMLInputElement).value, 10);
  }

  seleccionarTalla(talla: string) {
    this.producto.talla = talla;
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  nuevoProducto = {
    nombre: '',
    precio: 0,
    categoria: '',
    enlace: ''
  };

  constructor(private router: Router) {}

  agregarProducto() {
    this.nuevoProducto.nombre = (document.getElementById('nombre') as HTMLInputElement).value;
    this.nuevoProducto.precio = parseFloat((document.getElementById('precio') as HTMLInputElement).value);
    this.nuevoProducto.categoria = (document.getElementById('categoria') as HTMLInputElement).value;
    this.nuevoProducto.enlace = (document.getElementById('enlace') as HTMLInputElement).value;

    this.realizarPostProducto(this.nuevoProducto);
  }

  private realizarPostProducto(producto: any) {
    fetch('http://localhost:3000/productos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...producto
      }),
    })
    .then(response => {
      if (response.ok) {
        console.log('Producto agregado exitosamente');
      } else {
        console.error('Error al agregar el producto:', response.statusText);
      }
    })
    .catch(error => {
      console.error('Error de red al agregar el producto:', error);
    });
  }

  irAHome() {
    this.router.navigate(['/home']);
  }

  irABuscador() {
    this.router.navigate(['/buscador'])
  }
}

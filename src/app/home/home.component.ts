import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

    constructor(private router: Router) {}

    irAHome(){
      this.router.navigate(['/home'])
    }

    irAClientes(){
      this.router.navigate(['/cliente'])
    }

    irAProducto(nombre: string) {
      this.router.navigate([`/producto/${nombre}`])
    }

    irABuscador() {
      this.router.navigate(['/buscador'])
    }

}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { ProductoComponent } from './producto/producto.component';


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, ProductoComponent]
})

export class AppComponent {
  title = 'app';

  constructor(private router: Router) {}

    irAHome() {
      this.router.navigate(['/home']);
    }
    irASud() {
      this.router.navigate(['/home'], {fragment: 'pantalones'});
    }

}

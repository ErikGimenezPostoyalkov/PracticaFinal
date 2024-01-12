import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  @ViewChild('nombreInput') nombreInputRef!: ElementRef;
  @ViewChild('passwordInput') passwordInputRef!: ElementRef;
  passwordInputInvalid: boolean = true;

  constructor(private router: Router) {}

  mensajeError: string = '';

  comprobarCredencialesAdmin() {
    const nombreInput = this.nombreInputRef.nativeElement.value;
    const passwordInput = this.passwordInputRef.nativeElement.value;

    if (nombreInput === 'Admin' && passwordInput === 'Admin') {
      this.router.navigate(['/admin']);
    } else {
      this.mensajeError = 'Usuario o contraseña incorrectos';
      console.error(this.mensajeError);
    }
  }

  irAHome() {
    this.router.navigate(['/home']);
  }

  irABuscador() {
    this.router.navigate(['/buscador'])
  }

  irAAdmin() {
    this.router.navigate(['/admin'])
  }

}

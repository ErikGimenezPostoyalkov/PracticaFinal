import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css'
})
export class ClienteComponent {
  @ViewChild('nombreInput') nombreInputRef!: ElementRef;
  @ViewChild('passwordInput') passwordInputRef!: ElementRef;
  passwordInputInvalid: boolean = true;

  constructor(private router: Router) {}

  onPasswordInput() {
    const passwordInput = this.passwordInputRef.nativeElement;
    this.passwordInputInvalid = !this.validarContraseña(passwordInput.value);
  }

  private validarContraseña(contraseña: string): boolean {
    const longitudValida = contraseña.length >= 10;
    const tieneNumero = /\d/.test(contraseña);
    const tieneMayuscula = /[A-Z]/.test(contraseña);

    return longitudValida && tieneNumero && tieneMayuscula;
  }

  agregarCliente() {
    const nombreInput = this.nombreInputRef.nativeElement;
    const passwordInput = this.passwordInputRef.nativeElement;
    const nuevoCliente = {
      nombre: nombreInput.value,
      contraseña: passwordInput.value,
      tipo: 'Clientes'
    };

    this.realizarPostCliente(nuevoCliente);
  }

  private realizarPostCliente(cliente: any) {
    fetch('http://localhost:3000/usuario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ...cliente
        }),
    })
    .then(response => {
        if (response.ok) {
            console.log('Cliente agregado exitosamente');
        } else {
            console.error('Error al agregar el cliente:', response.statusText);
        }
    })
    .catch(error => {
        console.error('Error de red al agregar el cliente:', error);
    });
  }

  irAHome() {
    this.router.navigate(['/home']);
  }

  irABuscador() {
    this.router.navigate(['/buscador'])
  }

  irALogin() {
    this.router.navigate(['/login'])
  }
}

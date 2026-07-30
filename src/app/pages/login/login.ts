import { Component, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http'; // Para hacer peticiones HTTP
import { Router } from '@angular/router'; // Para navegar mediante código
import { FormsModule } from '@angular/forms'; // Para usar ngModel

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule, MatInputModule, MatButtonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private http = inject(HttpClient);
  private router = inject(Router);

  // Variables para almacenar los datos del formulario
  email: string = '';
  password: string = '';

  hacerLogin() {
    
    // 1. Creamos un objeto con los datos del formulario
    const credenciales = {
      email: this.email,
      password: this.password
    };

    // 2. Hacemos la petición POST al backend
    this.http.post<any>('http://localhost:8080/api/v1/auth/login', credenciales).subscribe({
      next: (respuesta) => {
        // 3. Guardamos el token en el localStorage
        localStorage.setItem('auth_token', respuesta.token);

        // 4. Redirigimos al dashboard
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        alert('Error al iniciar sesión: revisa tus credenciales.');
      }
    });

  }
}

import { Component } from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string;
  password: string;
  errorMessage = '';
  showLoginError = false;
  constructor(
    private authService: AuthService, // Servicio de autenticación que manejará la lógica de inicio de sesión
    private router: Router
  ) {}
  login(): void {
    // Asegúrate de que ambos campos no estén vacíos.
    if (this.username && this.password) {
      // Llamar al método authenticate del AuthService.
      this.authService.authenticate(this.username, this.password).subscribe(
        response => {
          // Imprime toda la respuesta para depurar.
          console.log('Response from server:', response.jwttoken);

          // Intenta acceder al token de diferentes maneras basadas en la respuesta.
          const token = response.jwttoken
          if (token) {
            localStorage.setItem('token', token);
            this.authService.setAuthStatus(true);
            this.router.navigate(['/user']);
            console.log("Inicio de sesión exitoso, token:", token);
            this.getUserData();
          } else {
            // Manejo del caso en el que el token no se encuentra.
            this.errorMessage = 'Token not found in the response.';
          }
        },
        error => {
          console.error('Error during login:', error);
          this.errorMessage = 'Invalid username or password.';
          this.showLoginError = true; // Mostrar mensaje de error
        }
      );
    } else {
      this.errorMessage = 'Please enter both username and password.';
      this.showLoginError = true; // Mostrar mensaje de error
    }
  }
  getUserData() {
    const token = localStorage.getItem('token');
    if (token) {
      this.authService.getUserData(token).subscribe(
        userData => {
          sessionStorage.setItem('user', JSON.stringify(userData));
          console.log(userData);
        },
        error => {
          console.error(error);
        }
      );
    }
  }
}



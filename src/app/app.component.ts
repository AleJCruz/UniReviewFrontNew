import { Component } from '@angular/core';
import {AuthService} from "./service/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'UniReviewFront';
  constructor(private authService: AuthService) {}

  login(username: string, password: string) {
    this.authService.authenticate(username, password).subscribe(
      data => {
        // Save the token locally (e.g., in localStorage)
        localStorage.setItem('token', data.token);
        // Now you can use the token to access protected routes
        this.getUserData();
      },
      error => {
        console.error(error);
      }
    );
  }

  getUserData() {
    const token = localStorage.getItem('token');
    if (token) {
      this.authService.getUserData(token).subscribe(
        userData => {
          console.log(userData);
        },
        error => {
          console.error(error);
        }
      );
    }
  }
}

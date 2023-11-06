import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {Subscription} from "rxjs";
import {User} from "../../model/User";
import {Image} from "../../model/Image";

@Component({
  selector: 'app-nvbar',
  templateUrl: './nvbar.component.html',
  styleUrls: ['./nvbar.component.css']
})
export class NvbarComponent implements OnInit, OnDestroy {
  public isAuthenticated: boolean;
  private subscription: Subscription;
  user:User;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.subscription = this.authService.getAuthStatus().subscribe(
      authStatus => {
        this.isAuthenticated = authStatus;
        if (this.isAuthenticated) {
          this.getUserData(); // Llamar a getUserData cuando el usuario se autentique
        }
      }
    );
  }

  // No olvides desuscribirte del observable para evitar fugas de memoria
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logout() {
    this.authService.logOut();
  }
  getUserData() {
    const token = localStorage.getItem('token');
    if (token) {
      this.authService.getUserData(token).subscribe(
        userData => {
          this.user = userData;
        },
        error => {
          console.error(error);
        }
      );
    }
  }
}

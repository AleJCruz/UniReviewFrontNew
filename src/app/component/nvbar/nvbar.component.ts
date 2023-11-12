import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {Subscription} from "rxjs";
import {User} from "../../model/User";
import {Image} from "../../model/Image";
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-nvbar',
  templateUrl: './nvbar.component.html',
  styleUrls: ['./nvbar.component.css']
})
export class NvbarComponent implements OnInit, OnDestroy {
  public isAuthenticated: boolean;
  private subscription: Subscription;
  user:User;
  private userSubscription: Subscription;
  linkEnabled: boolean = false;
  showMessage: boolean = false;
  constructor(private authService: AuthService, private userService:UserService) {}

  ngOnInit() {
    this.subscription = this.authService.getAuthStatus().subscribe(
      authStatus => {
        this.isAuthenticated = authStatus;
        if (this.isAuthenticated) {
          this.getUserData(); // Llamar a getUserData cuando el usuario se autentique
        }
      }
    );
    this.userSubscription = this.userService.getCurrentUserObservable().subscribe(
      (userData) => {
        if (userData) {
          this.user = userData;
        }
      }
    );
  }
  onLinkClick(): void {
    if (!this.linkEnabled) {
      this.showMessage = true;
      setTimeout(() => this.showMessage = false, 3000); // El mensaje desaparece después de 3 segundos
    }
  }

  // No olvides desuscribirte del observable para evitar fugas de memoria
  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.userSubscription.unsubscribe();
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
  isLinkDissabled() {
    this.user.roles.forEach(role => {
      if (role.id == 1 || role.id == 2) {
        this.linkEnabled = true;
      }
    });
  }
}

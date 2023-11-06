import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../../service/auth.service";
import {User} from "../../../model/User";
import {UserService} from "../../../service/user.service";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit{
  user: User;
  selectedFile: File;
  constructor(private router:Router,  private authService: AuthService, private userService:UserService) {

  }
  ngOnInit() {
    this.getUserData();
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

  updateProfile() {
    // Si hay un archivo seleccionado, actualiza imageData antes de enviar
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.user.image.imageData = btoa(event.target.result);
        this.sendUpdate();
      };
      reader.readAsBinaryString(this.selectedFile);
    } else {
      // Si no se ha seleccionado ningún archivo, simplemente actualiza el perfil
      this.sendUpdate();
    }
  }

  sendUpdate() {
    if (this.user) {
      this.userService.edit(this.user).subscribe(
        response => {
          console.log('Perfil actualizado correctamente', response);
        },
        error => {
          console.error('Error al actualizar el perfil', error);
        }
      );
    }
  }
}

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
  editMode: boolean = false;
  confirmation: boolean = false;
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
  toggleEdit() {
    this.editMode = !this.editMode;
  }

  confirmEdit() {
    this.confirmation = true;
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
  onFileSelected(event: Event): void {
    const element = event.target as HTMLInputElement;
    const files = element.files;
    if (files && files.length > 0) {
      const file = files[0];
      // Puedes continuar con la lógica de manejo del archivo aquí...
      const reader = new FileReader();
      reader.onload = () => {
        this.user.image.imageData = reader.result as string;
        if (this.user.image.imageData.startsWith('data:image')) {
          // Eliminamos el prefijo 'data:image/png;base64,' antes de enviar
          const base64Data = this.user.image.imageData.split(',')[1];
          this.user.image.imageData = base64Data;
        }
        // Aquí actualizarías la propiedad correspondiente a la imagen de perfil
      };
      reader.readAsDataURL(file);
    }
  }

  sendUpdate() {
    if (this.user) {
      this.userService.edit((<number>this.user.id), this.user.image).subscribe(
        response => {
          this.user = response.user;
          this.editMode = false;
          console.log('Perfil actualizado correctamente', response);
        },
        error => {
          console.error('Error al actualizar el perfil', error);
        }
      );
      this.userService.edituserdata((this.user)).subscribe(
        response => {

          this.editMode = false;
          console.log('Perfil actualizado correctamente', response);
        },
        error => {
          console.error('Error al actualizar el perfil', error);
        }
      );
    }
  }
}

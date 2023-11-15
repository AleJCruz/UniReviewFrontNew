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
  showValidationError: boolean = false;
  constructor(private router: Router, private authService: AuthService, private userService: UserService) { }

  ngOnInit() {
    this.getUserData();
  }

  getUserData() {
    const token = localStorage.getItem('token');
    if (token) {
      this.authService.getUserData(token).subscribe(
        userData => {
          this.user = userData;
          // Forzamos la detección de cambios en este punto si es necesario
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
    this.confirmation = false; // Ocultamos el diálogo de confirmación
    if (
      this.user.name.trim() === '' ||
      this.user.email.trim() === '' ||
      this.user.username.trim() === '' ||
      this.user.district.trim() === '' ||
      this.user.age === null // Agregamos la validación para age
    ) {
      this.showValidationError = true;

      // Después de 4 segundos, borra el mensaje de error
      setTimeout(() => {
        this.showValidationError = false;
      }, 4000);

      return;
    }
    if (this.selectedFile) {
      // Lógica para manejar el archivo seleccionado
      const reader = new FileReader();
      reader.onload = (event: any) => {
        // Aquí actualizamos la imagen de perfil
        const base64Data = event.target.result.split(',')[1];
        this.user.image.imageData = base64Data;
        this.sendUpdate(); // Ahora llamamos a sendUpdate aquí
      };
      reader.readAsDataURL(this.selectedFile);
    } else {
      // Si no hay archivo seleccionado, procedemos a actualizar directamente
      this.sendUpdate();
    }
  }

  onFileSelected(event: Event): void {
    const element = event.target as HTMLInputElement;
    const files = element.files;
    if (files && files.length > 0) {
      this.selectedFile = files[0]; // Actualizamos selectedFile para su uso en updateProfile
    }
  }

  sendUpdate() {
    if (this.user) {

      // Combina las llamadas de actualización en una secuencia si es necesario
      this.userService.edit((<number>this.user.id), this.user.image).subscribe(
        response => {
          // Actualizamos los datos del usuario con la nueva información
          this.user = { ...this.user, ...response.user };
          this.editMode = false; // Salimos del modo de edición
          console.log('Perfil actualizado correctamente', response);
        },
        error => {
          console.error('Error al actualizar el perfil', error);
        }
      );

      // Suponiendo que edituserdata() actualiza el resto de los datos del usuario
      this.userService.edituserdata(this.user).subscribe(
        response => {
          this.userService.updateCurrentUser(this.user);
          // Aquí también podríamos necesitar actualizar la información del usuario
          console.log('Datos de usuario actualizados correctamente', response);
        },
        error => {
          console.error('Error al actualizar los datos del usuario', error);
        }
      );
    }
  }
}

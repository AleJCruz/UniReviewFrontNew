import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../../service/user.service";
import { User } from "../../model/User";
import { Role } from "../../model/Role";
import { Router } from "@angular/router";
import {Image} from "../../model/Image";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  mensaje: string = "";

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nameUser: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      typeUser: ['universitario'], // el valor predeterminado es 'universitario'
      username:['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      districtUser: ['', Validators.required],
      ageUser: ['', [Validators.required, Validators.min(16), Validators.max(90)]]
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      const newUser: User = {
        id: 0,
        name: this.form.value.nameUser,
        age: this.form.value.ageUser,
        email: this.form.value.email,
        username: this.form.value.username,
        enabled: true,
        password: this.form.value.password,
        district: this.form.value.districtUser,
        roles: [new Role(this.form.value.typeUser === 'pre-universitario' ? 2 : 3, this.form.value.typeUser)],
        image: new Image()
      };

      this.userService.insert(newUser).subscribe({
        next: (data) => {
          // Actualizar la lista de usuarios o manejar la respuesta como sea necesario
          this.router.navigate(['/login']);
          console.log("Registro exitoso, datos:", newUser.username);
        },
        error: (error) => {
          // Manejar el error de inserción aquí
          this.mensaje = "Error al registrar usuario.";
          console.error(error);
        }
      });
    } else {
      this.mensaje = "Por favor, complete todos los campos requeridos.";
      console.log("ale no te mates")
    }
  }
}
// import {Component, OnInit} from '@angular/core';
// import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
// import {UserService} from "../../service/user.service";
// import {User} from "../../model/User";
// import {Role} from "../../model/Role";
// import {Router} from "@angular/router";
//
// @Component({
//   selector: 'app-register',
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.css']
// })
// export class RegisterComponent implements OnInit {
//   form: FormGroup=new FormGroup({});
//   user:User=new User();
//   mensaje:
//   constructor(
//     private router:Router,
//     private fb: FormBuilder,
//     private userService: UserService
//     ) {
//   }
//
//   ngOnInit(): void {
//     this.form= new FormGroup({
//       nameUser:new FormControl(['', [Validators.required, Validators.minLength(3)]]) ,
//       email: new FormControl(['', [Validators.required, Validators.email]]),
//       typeUser:new FormControl(['universitario']), // el valor predeterminado es 'universitario'
//       password:new FormControl (['', [Validators.required, Validators.minLength(6)]]),
//       districUser:new FormControl (['', Validators.required]),
//       ageUser:new FormControl (['', [Validators.required, Validators.min(16), Validators.max(90)]])
//     })
//   }
//
//   aceptar() {
//     this.user.id = 0;
//     this.user.name=this.form.value['nameUser'];
//     this.user.age=this.form.value['ageUser'];
//     this.user.email=this.form.value['email'];
//     this.user.password=this.form.value['password'];
//     this.user.district=this.form.value['districtUser'];
//     //ver si es Pre-universitario o universitario con el switch
//     switch (this.form.value['typeUser']){
//       case 'Pre-universitario':
//         this.user.roles.push(new Role(2, 'Pre-universitario'));
//         break;
//       case 'universitario':
//         this.user.roles.push(new Role(3, 'Pre-universitario'));
//         break;
//     }
//     if(this.form.valid){
//       console.log(this.user);
//       this.userService.insert(this.user).subscribe((data)=>{
//         this.userService.list().subscribe(data=>{
//           this.userService.setList(data);
//         });
//       });
//       this.router.navigate(['dessert']);
//     }else{
//       this.mensaje="Agregue campos omitidos";
//     }
//   }
//
// }

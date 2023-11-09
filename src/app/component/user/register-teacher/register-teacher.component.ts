import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../../service/user.service";
import {AuthService} from "../../../service/auth.service";
import {Image} from "../../../model/Image";
import {ImageService} from "../../../service/image.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Teacher} from "../../../model/Teacher";
import {Rigurosity} from "../../../model/Rigurosity";
import {TeacherService} from "../../../service/teacher.service";
import {Course} from "../../../model/Course";
import {CourseService} from "../../../service/course.service";

@Component({
  selector: 'app-register-teacher',
  templateUrl: './register-teacher.component.html',
  styleUrls: ['./register-teacher.component.css']
})
export class RegisterTeacherComponent implements OnInit {
  selectedFile: File;
  image:Image;
  teacherForm: FormGroup;
  fileName: string = 'Upload Image'; // Nuevo
  courses:Course[];
  showDropdown = false;
  selectedCourses: Course[] = [];
  constructor(private router: Router,private fb: FormBuilder, private teacherService:TeacherService, private imageService:ImageService
  ,private courseService:CourseService) {

  }
  ngOnInit() {
    this.getCourses();
    this.initializeForm();
  }

  goBack() {
    this.router.navigate(['/user/teachers']); // Asegúrate de cambiar a la ruta correcta
  }
  onFileSelected(event: Event): void {
    const element = event.target as HTMLInputElement;
    const files = element.files;
    if (files && files.length > 0) {
      this.selectedFile = files[0]; // Actualizamos selectedFile para su uso en updateProfile
      this.fileName = files[0].name; // Actualiza el nombre del archivo
    }
  }
  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  onCourseToggle(course: Course, event: any) {
    if (event.target.checked) {
      // Agregar al array si se selecciona
      this.selectedCourses.push(course);
    } else {
      // Remover del array si se deselecciona
      const index = this.selectedCourses.indexOf(course);
      if (index > -1) {
        this.selectedCourses.splice(index, 1);
      }
    }
    // Actualizar el valor del control del formulario
    this.teacherForm.controls['coursesArray'].setValue(this.selectedCourses);
  }
  guardar(){
    if (this.selectedFile) {
      if (this.teacherForm.valid){
        this.imageService.insert(this.selectedFile).subscribe(response => {
          this.image = response;
          const rigurosity: Rigurosity = {
            id:5,
            name: "Sin definir"
          }
          const teacher: Teacher = {
            id: 0,
            fullname: this.teacherForm.value.fullname,
            summary: this.teacherForm.value.summary,
            qualification: 0,
            coursesarray: [],
            rigurosity: rigurosity,
            image: this.image
          }
          this.teacherService.insert(teacher,this.image.id).subscribe({
            next: (data) => {
              this.selectedCourses.forEach(course => {
                console.log(course.id + " - "+ data.id);
                this.teacherService.addCourse(data.id,course.id).subscribe();
              });
              // Actualizar la lista de usuarios o manejar la respuesta como sea necesario
              console.log("Registro exitoso, datos:", teacher.fullname);
            },
            error: (error) => {
              // Manejar el error de inserción aquí
              console.error(error);
            }
          });
          console.log(this.image); // Esto imprimirá la imagen correctamente
        }, error => {
          console.error('Error al subir la imagen:', error);
        });
      }
    } else {
      console.error('No hay archivo seleccionado.');
    }
  }
  getCourses(){
    this.courseService.list().subscribe(data => {
      this.courses = data;
    });
  }
  initializeForm() {
    this.teacherForm = this.fb.group({
      fullname: ['', Validators.required],
      summary: ['', Validators.required],
      image: [null, Validators.required],
      coursesArray: [this.selectedCourses]// El archivo de imagen se manejará aparte
    });
  }
}

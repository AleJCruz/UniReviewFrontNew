import {Component, OnInit} from '@angular/core';
import {TeacherReview} from "../../../model/TeacherReview";
import {TeacherreviewService} from "../../../service/teacherreview.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Teacher} from "../../../model/Teacher";
import {TeacherService} from "../../../service/teacher.service";
import {User} from "../../../model/User";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../service/auth.service";

@Component({
  selector: 'app-qualificationteacher',
  templateUrl: './qualificationteacher.component.html',
  styleUrls: ['./qualificationteacher.component.css']
})
export class QualificationteacherComponent implements OnInit{
  teacherId: number;
  teacher: Teacher;
  reviews: TeacherReview[];
  reviewForm: FormGroup;
  isReviewFormVisible: boolean = false;
  user: User;
  constructor(
    private route:Router,
    private activatedRoute: ActivatedRoute,
    private teacherService: TeacherService,
    private teacherreviewService: TeacherreviewService,
    private authService:AuthService,
    private fb: FormBuilder
    ) {
  }
  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.teacherId = +params['id']; // o params.get('id') para queryParams
      // Ahora puedes usar teacherId para obtener los detalles del profesor
      this.getTeacherDetails(this.teacherId);
    });
    this.getUserData();
    this.reviewForm = this.fb.group({
      description: ['', Validators.required],
      score: ['', Validators.required],
      rigurosity: ['', Validators.required]
    });
    this.loadReviews();
  }

  toggleReviewForm() {
    this.isReviewFormVisible = !this.isReviewFormVisible;
  }

  submitReview() {
    if (this.reviewForm.valid && this.user.id != null) {
      const newReview: TeacherReview = {
        id: 0, // ID será generado por el backend
        reviewdate: new Date().toISOString(), // Fecha actual en formato ISO
        description: this.reviewForm.value.description,
        score: this.reviewForm.value.score,
        teacherDTO: this.teacher, // Suponiendo que teacher ya está asignado
        user: this.user, // Suponiendo que user ya está asignado
        rigurosityTitle: this.reviewForm.value.rigurosity
      };
      this.teacherreviewService.insert(newReview).subscribe(
        (response) => {
          console.log('Revisión del profesor enviada con éxito', response);
          this.reviewForm.reset();
          this.isReviewFormVisible = false;
          // Realiza cualquier otra acción necesaria después de enviar la revisión.
        },
        (error) => {
          console.error('Error al enviar la revisión del profesor', error);
        }
      );
    }
  }
  //RESENAS
  loadReviews() {
    this.teacherreviewService.list(this.teacherId).subscribe(
      (reviews: TeacherReview[]) => {
        this.reviews = reviews;
      },
      (error) => {
        console.error('Error al cargar las reseñas', error);
      }
    );
    this.teacherreviewService.getList().subscribe(
      (listanueva: TeacherReview[]) => {
        this.reviews = listanueva;
      },
      (error) => {
        console.error('Error al cargar las reseñas', error);
      }
    );
  }
  //nO TOCAR DE CA EN ADELANTE
  getUserData() {
    const userString = sessionStorage.getItem('user');
    if (userString) {
      const userData = JSON.parse(userString);
      this.user = Object.assign(new User(), userData);
    }
  }
  getTeacherDetails(id: number) {
    // Implementa la lógica para obtener los detalles del profesor
    // usando el teacherId, probablemente con una llamada a `teacherService`
    // Por ejemplo:
    this.teacherService.getTeacherbyID(id).subscribe(
      teacher => this.teacher = teacher
    );
  }
  getRigurosityClass(rigurosity: string) {
    switch (rigurosity.toLowerCase()) {
      case 'sin definir':
        return 'undefined';
      case 'baja':
        return 'low';
      case 'media':
        return 'medium';
      case 'alta':
        return 'high';
      case 'variable':
        return 'variable';
      default:
        return '';
    }
  }

}

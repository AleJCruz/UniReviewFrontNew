import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../../model/User";
import {University} from "../../../model/University";
import {AuthService} from "../../../service/auth.service";
import {UniversityService} from "../../../service/university.service";
import {UniversityreviewService} from "../../../service/universityreview.service";
import {UniversityReview} from "../../../model/UniversityReview";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subject, switchMap, takeUntil, tap} from "rxjs";

@Component({
  selector: 'app-qualificationuniversity',
  templateUrl: './qualificationuniversity.component.html',
  styleUrls: ['./qualificationuniversity.component.css']
})
export class QualificationuniversityComponent implements OnInit{
  universityId: number;
  user: User;
  university: University;
  isReviewFormVisible: boolean = false;
  reviews: UniversityReview[] = [];
  isValidationErrorVisible: boolean = false;
  validationErrorMessage: string = '';
  reviewForm: FormGroup;

  private unsubscribe$ = new Subject<void>();
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private universityService: UniversityService,
    private universityreviewService: UniversityreviewService

  ) { this.universityreviewService.getList().subscribe((reviews: UniversityReview[]) => {
    this.reviews = reviews;
  }); }
  ngOnInit() {
    this.activatedRoute.params.pipe(
      takeUntil(this.unsubscribe$), // Asegura la desuscripción automática
      tap(params => {
        this.universityId = +params['id'];
        this.getUniversityDetails(this.universityId);
        this.getUserData();
        this.initForm();
      }),
      switchMap(() => this.universityreviewService.list(this.universityId)) // Encadena llamadas
    ).subscribe(reviews => {
      this.reviews = reviews;
    });
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  getUserData() {
    const userString = sessionStorage.getItem('user');
    if (userString) {
      const userData = JSON.parse(userString);
      this.user = Object.assign(new User(), userData);
    }
  }
  getUniversityDetails(id: number) {
    this.universityService.getUniversitybyID(id).subscribe(
      (data: University) => {
        this.university = data;
      },
      error => {
        console.error('Error fetching university details', error);
      }
    );
  }
  /*Formulario*/
  initForm() {
    this.reviewForm = new FormGroup({
      'description': new FormControl(null, Validators.required),
      'relatedCareer': new FormControl(null, Validators.required),
      'score': new FormControl(null, Validators.required)
    });
  }
  toggleReviewForm() {
    this.isReviewFormVisible = !this.isReviewFormVisible;
  }
  submitReview() {
    if (this.reviewForm.valid && this.user && this.user.id !== null && this.user.id !== 0){
      const newReview: UniversityReview = {
        id: 0, // ID será generado por el backend
        reviewdate: new Date().toISOString(), // Fecha actual en formato ISO
        description: this.reviewForm.value.description,
        score: this.reviewForm.value.score,
        university: this.university, // Suponiendo que university ya está asignado
        user: this.user, // Suponiendo que user ya está asignado
        relatedCareer: this.reviewForm.value.relatedCareer
      };
      this.universityreviewService.insert(newReview).pipe(
        takeUntil(this.unsubscribe$) // Asegura la desuscripción automática
      ).subscribe(
        (reviews) => {
          this.reviewForm.reset();
          this.isReviewFormVisible = false;
          this.reviews = reviews;
          this.router.navigate(['/university', this.universityId]);
        },
        error => {
          console.error('Error creating review', error);
        }
      );
    }
    else {
      // Muestra el mensaje de error si el id del usuario es nulo o 0
      this.isValidationErrorVisible = true;
      this.validationErrorMessage = 'El ID del usuario no es válido. Por favor, inicie sesión nuevamente.';

      // Configurar un temporizador para ocultar el mensaje después de 4 segundos
      setTimeout(() => {
        this.isValidationErrorVisible = false;
        this.validationErrorMessage = '';
      }, 4000);
    }
  }
  /*Reviews*/
  loadReviews() {
        this.universityreviewService.list(this.universityId).subscribe(
      (reviews: UniversityReview[]) => {
        this.reviews = reviews;
      },
      (error) => {
        console.error('Error al cargar las reseñas', error);
      }
    );
    this.universityreviewService.getList().subscribe((reviews: UniversityReview[]) => {
      this.reviews = reviews;
    });
  }
}

import {Component, OnInit} from '@angular/core';
import {Teacher} from "../../../model/Teacher";
import {TeacherService} from "../../../service/teacher.service";
import {Rigurosity} from "../../../model/Rigurosity";
import {Course} from "../../../model/Course";
import {CourseService} from "../../../service/course.service";
import {RigurosityService} from "../../../service/rigurosity.service";
import * as noUiSlider from 'nouislider';

@Component({
  selector: 'app-listteacher',
  templateUrl: './listteacher.component.html',
  styleUrls: ['./listteacher.component.css']
})
export class ListteacherComponent implements OnInit {
  teachers: Teacher[] = [];
  searchTerm: string = '';
  rigurosities: Rigurosity[] = [];
  courses: Course[] = [];
  busquedaAvanzada: boolean = false;
  qualificationFrom: number = 1;
  qualificationTo: number = 5;
  selectedRigurosity: 0;
  selectedCourse: 0;
  constructor(private teacherService: TeacherService, private courseService:CourseService
  ,private rigurosityService:RigurosityService) {}

  ngOnInit(): void {
    this.listarProfesores();
    this.load();

  }
  toggleAdvancedSearch() {
      this.busquedaAvanzada = !this.busquedaAvanzada;
  }
  validateFields() {
      // Lógica para validar los campos y mostrar mensajes o bordes rojos
  }

  listarProfesores(): void {
    this.teacherService.list().subscribe(
      (data: Teacher[]) => {
        this.teachers = data;
      },
      error => {
        console.error('Error fetching teachers', error);
      }
    );
  }
    buscarProfesores(): void {
        // Se usa una variable separada para no alterar el searchTerm que se muestra en el input
        let searchTermToSend = this.searchTerm || '&todos&';
        this.selectedRigurosity = this.selectedRigurosity || 0;
        this.selectedCourse = this.selectedCourse || 0;

        if (this.busquedaAvanzada) {
            this.teacherService.listTeachersByAdvancedSearch(
                this.qualificationFrom,
                this.qualificationTo,
                this.selectedRigurosity,
                this.selectedCourse,
                searchTermToSend
            ).subscribe(
                (data: Teacher[]) => {
                    this.teachers = data;
                },
                error => {
                    console.error('Error fetching teachers with advanced search', error);
                }
            );
        } else {
            if (!this.searchTerm) {
                this.listarProfesores();
            } else {
                this.teacherService.listByFullName(searchTermToSend).subscribe(
                    (data: Teacher[]) => {
                        this.teachers = data;
                    },
                    error => {
                        console.error('Error fetching teachers by name', error);
                    }
                );
            }
        }
    }
  load() {
    this.courseService.list().subscribe(
        (data: Course[]) => {
          this.courses = data;
        },
        error => {
          console.error('Error fetching courses', error);
        }
    );
    this.rigurosityService.list().subscribe(
        (data: Rigurosity[]) => {
          this.rigurosities = data;
        },
        error => {
          console.error('Error fetching rigurosities', error);
        }
    );
  }
    syncRanges() {
        const lower = this.qualificationFrom;
        const upper = this.qualificationTo;

        if (lower > upper) {
            [this.qualificationFrom, this.qualificationTo] = [upper, lower];
        }
    }
}

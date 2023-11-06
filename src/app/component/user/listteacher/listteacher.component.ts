import {Component, OnInit} from '@angular/core';
import {Teacher} from "../../../model/Teacher";
import {TeacherService} from "../../../service/teacher.service";

@Component({
  selector: 'app-listteacher',
  templateUrl: './listteacher.component.html',
  styleUrls: ['./listteacher.component.css']
})
export class ListteacherComponent implements OnInit {
  teachers: Teacher[] = [];

  constructor(private teacherService: TeacherService) {}

  ngOnInit(): void {
    this.listarProfesores();
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
  calificar(teacher: Teacher): void {
    // Implementar lógica para calificar al profesor
    console.log('Calificando a', teacher.fullname);
  }
}

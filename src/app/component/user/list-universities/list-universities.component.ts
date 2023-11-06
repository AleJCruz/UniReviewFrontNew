import {Component, OnDestroy, OnInit} from '@angular/core';
import {University} from "../../../model/University";
import {UniversityService} from "../../../service/university.service";

@Component({
  selector: 'app-list-universities',
  templateUrl: './list-universities.component.html',
  styleUrls: ['./list-universities.component.css']
})
export class ListUniversitiesComponent implements OnInit {

  universities: University[] = [];
  constructor(private universityService: UniversityService) { }

  ngOnInit(): void {
    this.universityService.list().subscribe(data => {
      this.universities = data;
    });

    this.universityService.getList().subscribe(data => {
      this.universities = data;
    });
  }

}

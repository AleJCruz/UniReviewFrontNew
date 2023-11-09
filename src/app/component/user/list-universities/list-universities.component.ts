import {Component, OnDestroy, OnInit} from '@angular/core';
import {University} from "../../../model/University";
import {UniversityService} from "../../../service/university.service";

@Component({
  selector: 'app-list-universities',
  templateUrl: './list-universities.component.html',
  styleUrls: ['./list-universities.component.css']
})
export class ListUniversitiesComponent implements OnInit {
  districts: string[] = [
    'Todos los distritos',
    'Ancón',
    'Ate',
    'Barranco',
    'Breña',
    'Carabayllo',
    'Chaclacayo',
    'Chorrillos',
    'Cieneguilla',
    'Comas',
    'El Agustino',
    'Independencia',
    'Jesús María',
    'La Molina',
    'La Victoria',
    'Lima',
    'Lince',
    'Los Olivos',
    'Lurigancho',
    'Lurin',
    'Magdalena del Mar',
    'Pueblo Libre',
    'Miraflores',
    'Pachacamac',
    'Pucusana',
    'Puente Piedra',
    'Punta Hermosa',
    'Punta Negra',
    'Rímac',
    'San Bartolo',
    'San Borja',
    'San Isidro',
    'San Juan de Lurigancho',
    'San Juan de Miraflores',
    'San Luis',
    'San Martín de Porres',
    'San Miguel',
    'Santa Anita',
    'Santa María del Mar',
    'Santa Rosa',
    'Santiago de Surco',
    'Surquillo',
    'Villa El Salvador',
    'Villa María del Triunfo'
  ];  modalities: string[] = ['Todas las modalidades','EPE', 'PREGRADO', 'POSGRADO'];
  busquedaAvanzada: boolean = false;
  selectedDistrict: string = 'Todos los distritos';
  selectedModality: string = 'PREGRADO';
  qualificationFrom: number = 1;
  qualificationTo: number = 5;
  pensionFrom: number = 0;
  pensionTo: number = 0;
  universities: University[] = [];
  constructor(private universityService: UniversityService) { }

  ngOnInit(): void {
    this.loadUniversities()
  }
  toggleAdvancedSearch(): void {
    this.busquedaAvanzada = !this.busquedaAvanzada;
  }
  loadUniversities(): void {
    this.universityService.list().subscribe(data => {
      this.universities = data;
    });

    this.universityService.getList().subscribe(data => {
      this.universities = data;
    });
  }
  buscarUniversidades(): void {
    if (this.busquedaAvanzada) {
      this.universityService.listUniversitiesAdvancedFilter(
          this.selectedDistrict,
          this.selectedModality,
          this.qualificationFrom,
          this.qualificationTo,
          this.pensionFrom,
          this.pensionTo
      ).subscribe(data => {
        this.universities = data;
      });
    } else {
      this.loadUniversities();
    }
  }
}

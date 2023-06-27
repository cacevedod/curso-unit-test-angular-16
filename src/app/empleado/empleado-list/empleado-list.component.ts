import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Empleado } from 'src/app/empleado.model';
import { EmpleadoService } from 'src/app/empleado.service';

@Component({
  selector: 'app-empleado-list',
  templateUrl: './empleado-list.component.html',
  styleUrls: ['./empleado-list.component.css']
})
export class EmpleadoListComponent {

  empleados: Observable<Empleado[]>;
  selectedEmpleado!: Empleado;

  constructor(
    private router: Router,
    private empleadoService: EmpleadoService) {
    this.empleados = this.empleadoService.getEmpleados();
  }

  onSelect(empleado: Empleado) {
    this.selectedEmpleado = empleado;
    this.router.navigate(['../empleados', this.selectedEmpleado.id ]);
  }

}

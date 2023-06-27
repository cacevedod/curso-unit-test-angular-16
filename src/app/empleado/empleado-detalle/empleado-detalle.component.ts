import { Component, OnInit, Input } from '@angular/core';
import { Empleado } from '../../empleado.model';
import { EmpleadoService } from '../../empleado.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-empleado-detalle',
  templateUrl: './empleado-detalle.component.html',
  styleUrls: ['./empleado-detalle.component.css'],
  providers:  [ EmpleadoService ]
})
export class EmpleadoDetalleComponent implements OnInit {
  constructor(
    private empleadoService: EmpleadoService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  empleado!: Empleado;
  nuevo: Boolean = false;

  ngOnInit(): void {
    this.route.paramMap.subscribe(pmap => this.getEmpleado(pmap.get('id')));
  }

  private getEmpleado(id: string | null): void {
    this.empleadoService.getEmpleadoById(Number(id)).subscribe(empleado => {
      if (empleado) {
        this.nuevo = false;
        this.empleado = empleado;
      } else {
        this.nuevo = true;
        this.empleado = { id: 0 } as Empleado;
        return;
      }
    });
  }

  save(): void {
    if (this.nuevo){
      this.empleadoService.crearEmpleado(this.empleado).subscribe(() => this.goToList());
    }else{
      this.empleadoService.actualizarEmpleado(this.empleado).subscribe(() => this.goToList());
    }
  }

  cancel() { this.goToList(); }

  goToList() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}


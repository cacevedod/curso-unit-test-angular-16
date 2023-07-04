import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empleado } from '../src/app/empleado.model'
import { from, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoServiceMock {
  private apiUrl = 'https://testing.com';
  
  empleadosDummy: Empleado[] = [
    {id: 1, nombre: 'carlos', apellido: "acevedo", puesto: "arq"} as Empleado,
    {id: 2, nombre: 'eduardo', apellido: "duque", edad: 21, puesto: "arq"} as Empleado
  ]

  constructor() {}

  getEmpleados(): Observable<Empleado[]> {
      return of(this.empleadosDummy);
  }

  getEmpleadoById(id: number): Observable<Empleado | undefined> {
      return of(this.empleadosDummy.filter(it => it.id == id).pop());
  }

  crearEmpleado(empleado: Empleado): Observable<Empleado> {
      this.empleadosDummy.push(empleado);
      return of(empleado);
  }

  actualizarEmpleado(empleado: Empleado): Observable<Empleado> {
      this.empleadosDummy.filter(it => it.id == empleado.id).pop();
      this.empleadosDummy.push(empleado);
      return of(empleado);
  }

  eliminarEmpleado(id: number): Observable<void> {
      this.empleadosDummy.filter(it => it.id == id).pop();
      return of();
  }
}

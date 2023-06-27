import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empleado } from './empleado.model';
import { from, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  private apiUrl = 'https://ejemplo.com/api/empleados'; // Reemplaza con la URL de tu API
  private isMocked: Boolean = true;
  
  empleadosDummy: Empleado[] = [
    {id: 1, nombre: 'carlos', apellido: "acevedo", puesto: "arq"} as Empleado,
    {id: 2, nombre: 'eduardo', apellido: "duque", edad: 21, puesto: "arq"} as Empleado
  ]

  constructor(private http: HttpClient) {}

  getEmpleados(): Observable<Empleado[]> {
    if (this.isMocked){
      return of(this.empleadosDummy);
    }else{
      return this.http.get<Empleado[]>(this.apiUrl);
    }
  }

  getEmpleadoById(id: number): Observable<Empleado | undefined> {
    if (this.isMocked){
      return of(this.empleadosDummy.filter(it => it.id == id).pop())
    }else{
      const url = `${this.apiUrl}/${id}`;
      return this.http.get<Empleado>(url);
    }
    
  }

  crearEmpleado(empleado: Empleado): Observable<Empleado> {
    if (this.isMocked){
      this.empleadosDummy.push(empleado);
      return of(empleado);
    }else{
      return this.http.post<Empleado>(this.apiUrl, empleado);
    }
  }

  actualizarEmpleado(empleado: Empleado): Observable<Empleado> {
    if (this.isMocked){
      this.empleadosDummy.filter(it => it.id == empleado.id).pop();
      this.empleadosDummy.push(empleado);
      return of(empleado);
    }else{
      const url = `${this.apiUrl}/${empleado.id}`;
      return this.http.put<Empleado>(url, empleado);
    }
  }

  eliminarEmpleado(id: number): Observable<void> {
    if (this.isMocked){
      this.empleadosDummy.filter(it => it.id == id).pop();
      return of()
    }else{
      const url = `${this.apiUrl}/${id}`;
      return this.http.delete<void>(url);
    }
  }
}

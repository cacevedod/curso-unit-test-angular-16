import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empleado } from './empleado.model';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  private apiUrl = 'https://ejemplo.com/api/empleados'; // Reemplaza con la URL de tu API

  constructor(private http: HttpClient) {}

  getEmpleados(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(this.apiUrl);
  }

  getEmpleadoById(id: number): Observable<Empleado> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Empleado>(url);
  }

  crearEmpleado(empleado: Empleado): Observable<Empleado> {
    return this.http.post<Empleado>(this.apiUrl, empleado);
  }

  actualizarEmpleado(empleado: Empleado): Observable<Empleado> {
    const url = `${this.apiUrl}/${empleado.id}`;
    return this.http.put<Empleado>(url, empleado);
  }

  eliminarEmpleado(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EmpleadoService } from './empleado.service';
import { Empleado } from './empleado.model';
import { HttpErrorResponse } from '@angular/common/http';

describe('EmpleadoService', () => {
  let empleadoService: EmpleadoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EmpleadoService]
    });

    empleadoService = TestBed.inject(EmpleadoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debería obtener todos los empleados', () => {
    const dummyEmpleados: Empleado[] = [
      { id: 1, nombre: 'Juan', apellido: 'Pérez', edad: 30, puesto: 'Gerente' },
      { id: 2, nombre: 'María', apellido: 'López', edad: 28, puesto: 'Analista' }
    ];

    empleadoService.getEmpleados().subscribe((empleados: Empleado[]) => {
      expect(empleados.length).toBe(2);
      expect(empleados).toEqual(dummyEmpleados);
    });

    const req = httpMock.expectOne('https://ejemplo.com/api/empleados');
    expect(req.request.method).toBe('GET');
    req.flush(dummyEmpleados);
  });

  it('debería obtener un empleado por su ID', () => {
    const empleadoId = 1;
    const dummyEmpleado: Empleado = { id: empleadoId, nombre: 'Juan', apellido: 'Pérez', edad: 30, puesto: 'Gerente' };

    empleadoService.getEmpleadoById(empleadoId).subscribe((empleado: Empleado) => {
      expect(empleado).toEqual(dummyEmpleado);
    });

    const req = httpMock.expectOne(`https://ejemplo.com/api/empleados/${empleadoId}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyEmpleado);
  });

  it('debería crear un nuevo empleado', () => {
    const empleado: Empleado = { id: 1, nombre: 'Pedro', apellido: 'Gómez', edad: 25, puesto: 'Asistente' };

    empleadoService.crearEmpleado(empleado).subscribe((nuevoEmpleado: Empleado) => {
      expect(nuevoEmpleado).toEqual(empleado);
    });

    const req = httpMock.expectOne('https://ejemplo.com/api/empleados');
    expect(req.request.method).toBe('POST');
    req.flush(empleado);
  });

  it('debería actualizar un empleado existente', () => {
    const empleadoId = 1;
    const empleado: Empleado = { id: empleadoId, nombre: 'Juan', apellido: 'Pérez', edad: 30, puesto: 'Gerente' };

    empleadoService.actualizarEmpleado(empleado).subscribe((empleadoActualizado: Empleado) => {
      expect(empleadoActualizado).toEqual(empleado);
    });

    const req = httpMock.expectOne(`https://ejemplo.com/api/empleados/${empleadoId}`);
    expect(req.request.method).toBe('PUT');
    req.flush(empleado);
  });

  it('debería eliminar un empleado por su ID', () => {
    const empleadoId = 1;
    const mockEmpleado: Empleado = { id: empleadoId, nombre: 'Juan', apellido: 'Pérez', edad: 30, puesto: 'Gerente' };

    empleadoService.getEmpleadoById(empleadoId).subscribe((empleado: Empleado) => {
      expect(empleado).toEqual(mockEmpleado);
    });

    const req = httpMock.expectOne(`https://ejemplo.com/api/empleados/${empleadoId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockEmpleado);
  });

  describe('Control de Errores', () => {
    it('debería retornar un error cuando falle el servicio con Not Found', () => {
      const empleadoId = 1;

      empleadoService.getEmpleadoById(empleadoId).subscribe( {
        next: () => fail('should have failed with the 404 error'),
        error: (error: HttpErrorResponse) => {
          expect(error.status).withContext('status').toEqual(404);
          expect(error.error).withContext('message').toEqual("404 error");
        },
      });
  
      const req = httpMock.expectOne(`https://ejemplo.com/api/empleados/${empleadoId}`);
      expect(req.request.method).toBe('GET');
      req.flush("404 error", { status: 404, statusText: 'Not Found' });
    });

    it('debería retornar un error cuando falle el servicio con Server Error', () => {
      const empleado: Empleado = { id: 1, nombre: 'Pedro', apellido: 'Gómez', edad: 25, puesto: 'Asistente' };
  
      empleadoService.crearEmpleado(empleado).subscribe( {
        next: () => fail('should have failed with the 500 error'),
        error: (error: HttpErrorResponse) => {
          expect(error.status).withContext('status').toEqual(500);
          expect(error.error).withContext('message').toEqual("Internal Server Error");
        },
      });
  
      const req = httpMock.expectOne('https://ejemplo.com/api/empleados');
      expect(req.request.method).toBe('POST');
      req.flush("Internal Server Error", { status: 500, statusText: 'Internal Server Error' });
    });
  });

  
});

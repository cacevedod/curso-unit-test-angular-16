import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmpleadoDetalleComponent } from './empleado-detalle.component';
import {FormsModule} from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Router, provideRouter } from '@angular/router';
import { EmpleadoServiceMock } from 'tests/empleado.service.mock';
import { RouterTestingHarness } from '@angular/router/testing';
import { EmpleadoService } from 'src/app/empleado.service';

describe('EmpleadoDetalleComponent', () => {
  // se debe desactivar el modo mock del EmpleadoService para que corra OK

  let component: EmpleadoDetalleComponent;
  let harness: RouterTestingHarness;
  const empleadoServiceMock = new EmpleadoServiceMock();

  beforeEach(async () => {
    await
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [EmpleadoDetalleComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([{path: 'empleados/:id', component: EmpleadoDetalleComponent}])
      ]
    }).compileComponents();
  });

  it('debe mostrar el nombre del primer empleado al inicio del componente', async () => {
    const expected = empleadoServiceMock.empleadosDummy[0];
    await createComponent(expected.id).then(() => {
      const tmp: HTMLElement = harness.routeNativeElement!.querySelector('h2')! as HTMLElement
      expect(tmp.textContent).toBe(expected.nombre + " Detalles");
      const pageElem: HTMLElement = harness.routeNativeElement!.querySelector('span')! as HTMLElement
      expect(pageElem.textContent).toBe(expected.nombre);
    });
  });

  it('Router - debe cambiar de pagina cuando se de click en cancelar', async () => {
    await createComponent(1).then(() => {
      const listBtn = harness.routeNativeElement!.querySelectorAll('button') as any as HTMLButtonElement[];
      const cancelBtn: HTMLElement = listBtn[1];
      cancelBtn.click(); // otra forma de generar el evento click
      expect(TestBed.inject(Router).url).toEqual(`/empleados/1`);
      expect(component.nuevo).toBeFalse();
    });
  });

  describe('cuando navegamos a una ruta que no existe (no existe el empleado)', () => {
    beforeEach(async () => {
      await createComponent(999);
    });

    it('debe navegar a creacion de empleados', () => {
      expect(TestBed.inject(Router).url).toEqual('/empleados/999');
      expect(component.nuevo).toBeTrue();
    });
  });

  /////////// Helpers /////
  async function createComponent(id: number) {
    harness = await RouterTestingHarness.create();
    component = await harness.navigateByUrl(`/empleados/${id}`, EmpleadoDetalleComponent);
  
    const request = TestBed.inject(HttpTestingController).expectOne(`https://ejemplo.com/api/empleados/${id}`);
    const empleadoDummy = empleadoServiceMock.empleadosDummy.find(e => e.id === Number(id));
    request.flush(empleadoDummy ? empleadoDummy : null);
    harness.detectChanges();
  }

});

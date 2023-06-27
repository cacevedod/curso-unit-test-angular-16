import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadoDetalleComponent } from './empleado-detalle.component';

describe('EmpleadoDetalleComponent', () => {
  let component: EmpleadoDetalleComponent;
  let fixture: ComponentFixture<EmpleadoDetalleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmpleadoDetalleComponent]
    });
    fixture = TestBed.createComponent(EmpleadoDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Prueba usando el Pipe', () => {
    it('debe transformar el nombre de un empleado a Titulo usando el Pipe', () => {
      const hostElement: HTMLElement = harness.routeNativeElement!;
      const nameInput: HTMLInputElement = hostElement.querySelector('input')!;
      const nameDisplay: HTMLElement = hostElement.querySelector('span')!;
    
      // simulamos una entrada de nombre en el campo
      nameInput.value = 'MARIA de LAS TREs Cruces';
      nameInput.dispatchEvent(new Event('input'));
      harness.detectChanges();
    
      expect(nameDisplay.textContent).toBe('Maria De Las Tres Cruces');
    });
  });
});

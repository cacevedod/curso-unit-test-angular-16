import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { EmpleadoListComponent } from './empleado-list.component';
import { EmpleadoService } from 'src/app/empleado.service';
import { EmpleadoServiceMock } from 'tests/empleado.service.mock';
import { Router } from '@angular/router';

describe('EmpleadoListComponent', () => {
  let component: EmpleadoListComponent;
  let fixture: ComponentFixture<EmpleadoListComponent>;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  const empleadoMock = new EmpleadoServiceMock();

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmpleadoListComponent],
      providers: [
        {provide: EmpleadoService, useValue: empleadoMock},
        {provide: Router, useValue: routerSpy}
      ]
    });
    fixture = TestBed.createComponent(EmpleadoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe dar click en el empleado seleccionado', fakeAsync(() => {
    const expected = empleadoMock.empleadosDummy[1];
    const rowNodes = fixture.nativeElement.querySelectorAll('li');
    const rows: HTMLLIElement[] = Array.from(rowNodes);
    const btn = rows[1].querySelector('button');

    btn!.dispatchEvent(new Event('click'));
    tick();
    expect(component.selectedEmpleado).toEqual(expected);
  }));
});

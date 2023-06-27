import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { HighlightDirective } from './highlight.directive';

// Componente de prueba para la Directiva
@Component({
  template: `
  <h2 highlight="yellow">Amarillo</h2>
  <h2 highlight>Valor por defecto de la directiva, Gris claro</h2>
  <h2>Sin resaltar</h2>
  <input #box [highlight]="box.value" value="cyan"/>`
})
class TestComponent { }

describe('HighlightDirective', () => {

  let fixture: ComponentFixture<TestComponent>;
  let des: DebugElement[];  // elemntos que tendrán la directiva
  let bareH2: DebugElement; // Elemento que no tiene la directiva (h2)

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [ HighlightDirective, TestComponent ]
    })
    .createComponent(TestComponent);

    fixture.detectChanges();
    des = fixture.debugElement.queryAll(By.directive(HighlightDirective));
    bareH2 = fixture.debugElement.query(By.css('h2:not([highlight])'));
  });

  it('deben existir 3 elementos con resaltados', () => {
    expect(des.length).toBe(3);
  });

  it('debe tener color amarillo el primer <h2>"', () => {
    const bgColor = des[0].nativeElement.style.backgroundColor;
    expect(bgColor).toBe('yellow');
  });

  it('debe tener color gris claro (color por defecto) el primer <h2>', () => {
    const dir = des[1].injector.get(HighlightDirective) as HighlightDirective;
    const bgColor = des[1].nativeElement.style.backgroundColor;
    expect(bgColor).toBe(dir.defaultColor);
  });

  it('debe cambiar el color del input dependiendo del color ingresado', () => {
    const input = des[2].nativeElement as HTMLInputElement;
    expect(input.style.backgroundColor)
      .withContext('Color inicial')
      .toBe('cyan');

    input.value = 'green';

    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(input.style.backgroundColor).toBe('green');
  });


  it('h2 no debe tener "customProperty"', () => {
    expect(bareH2.properties['customProperty']).toBeUndefined();
  });

  it('el tercer h2 no debe tener `HighlightDirective` en los providerTokens', () => {
    expect(bareH2.providerTokens).not.toContain(HighlightDirective);
  });
});

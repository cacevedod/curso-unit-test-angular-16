import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerComponent } from './banner.component';

describe('BannerComponent', () => {
  let component: BannerComponent;
  let fixture: ComponentFixture<BannerComponent>;
  let h1: HTMLElement;

  describe('Ejemplo usando 2 beforeEach', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [ BannerComponent ],
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(BannerComponent);
      component = fixture.componentInstance;
      h1 = fixture.nativeElement.querySelector('h1');
    });

    tests();
  });

  describe('Ejemplo usando 1 beforeEach', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [ BannerComponent ],
      }).compileComponents();
      fixture = TestBed.createComponent(BannerComponent);
      component = fixture.componentInstance;
      h1 = fixture.nativeElement.querySelector('h1');
    });

    tests();
  });

  function tests() {
    it('ejemplo de que no se encuentran los titulos sin usar detectChanges()', () => {
      expect(h1.textContent).toEqual('');
    });

    it('debe mostrar el titulo cargado del componente', () => {
      fixture.detectChanges();
      expect(h1.textContent).toContain(component.title);
    });

    it('debe mostrar un titulo diferente si se cambia el titulo del componente', () => {
      component.title = 'Titulo de prueba';
      fixture.detectChanges();
      expect(h1.textContent).toContain('Titulo de prueba');
    });
  }
});

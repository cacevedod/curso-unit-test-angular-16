import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BannerComponent } from './banner.component';
import { HighlightDirective } from '../highlight.directive';

describe('BannerComponent', () => {
  let component: BannerComponent;
  let fixture: ComponentFixture<BannerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BannerComponent, , HighlightDirective],
      schemas:      [ CUSTOM_ELEMENTS_SCHEMA ]
    });
    fixture = TestBed.createComponent(BannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Pruebas para la Directiva', () => {
    it('debe resaltar el Titulo de color "skyblue"', () => {
      const h2: HTMLElement = fixture.nativeElement.querySelector('h2');
      const bgColor = h2.style.backgroundColor;
      expect(bgColor).toBe('skyblue');
    });
  });
});

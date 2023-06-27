import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({ selector: '[highlight]' })
export class HighlightDirective implements OnChanges {

  defaultColor =  'rgb(211, 211, 211)'; // gris claro

  @Input('highlight') bgColor = '';

  constructor(private element: ElementRef) {
    element.nativeElement.style.customProperty = true;
  }

  ngOnChanges() {
    this.element.nativeElement.style.backgroundColor = this.bgColor || this.defaultColor;
  }
}
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DescuentoService {

  constructor() { }
  
  calcularDescuento(valorCompra: number): number {
    let descuento = 0;
    
    if (valorCompra > 80 && valorCompra <= 140) {
      descuento = valorCompra * 0.05;
    } else if (valorCompra > 140 && valorCompra <= 200) {
      descuento = valorCompra * 0.08;
    } else if (valorCompra > 200) {
      descuento = valorCompra * 0.1;
    }
    
    return descuento;
  }
}

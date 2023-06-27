import { DescuentoService } from './descuento.service';

describe('DescuentoService', () => {
  let descuentoService: DescuentoService;

  beforeEach(() => {
    descuentoService = new DescuentoService();
  });

  it('debería calcular un descuento del 5% para una compra mayor a 80 y menor o igual a 140', () => {
    const valorCompra = 100;
    const descuento = descuentoService.calcularDescuento(valorCompra);
    expect(descuento).toBe(valorCompra * 0.05);
  });

  it('debería calcular un descuento del 8% para una compra mayor a 140 y menor o igual a 200', () => {
    const valorCompra = 150;
    const descuento = descuentoService.calcularDescuento(valorCompra);
    expect(descuento).toBe(valorCompra * 0.08);
  });

  it('debería calcular un descuento del 10% para una compra mayor a 200', () => {
    const valorCompra = 250;
    const descuento = descuentoService.calcularDescuento(valorCompra);
    expect(descuento).toBe(valorCompra * 0.1);
  });

  it('no debería calcular ningún descuento para una compra menor o igual a 80', () => {
    const valorCompra = 50;
    const descuento = descuentoService.calcularDescuento(valorCompra);
    expect(descuento).toBe(0);
  });
});

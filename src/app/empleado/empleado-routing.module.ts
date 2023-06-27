import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpleadoListComponent } from './empleado-list/empleado-list.component';
import { EmpleadoDetalleComponent } from './empleado-detalle/empleado-detalle.component';

const routes: Routes =  [
  { path: '',    component: EmpleadoListComponent },
  { path: ':id', component: EmpleadoDetalleComponent }
];

export const routedComponents = [EmpleadoDetalleComponent, EmpleadoListComponent];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpleadoRoutingModule {}

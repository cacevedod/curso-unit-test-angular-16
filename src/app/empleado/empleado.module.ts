import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { routedComponents, EmpleadoRoutingModule } from './empleado-routing.module';

@NgModule({
  imports:      [ CommonModule, EmpleadoRoutingModule, FormsModule ],
  declarations: [ routedComponents ]
})
export class EmpleadoModule { }

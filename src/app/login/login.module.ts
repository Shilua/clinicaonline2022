import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register/register.component';
import { UtilsModule } from '../utils/utils.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IngresoComponent } from './ingreso/ingreso.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    IngresoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LoginRoutingModule,
    UtilsModule
  ],
  exports: [
    RegisterComponent
  ]
})
export class LoginModule { }

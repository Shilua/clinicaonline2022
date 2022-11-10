import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanelRoutingModule } from './panel-routing.module';
import { PanelComponent } from './panel.component';
import { TablaComponent } from './components/tabla/tabla.component';
import { UtilsModule } from '../utils/utils.module';
import { LoginModule } from '../login/login.module';
import { TablaTurnosComponent } from './components/tabla-turnos/tabla-turnos.component';
import { PanelPacienteComponent } from './components/panel-paciente/panel-paciente.component';
import { PanelDoctorComponent } from './components/panel-doctor/panel-doctor.component';
import { CrearTurnoComponent } from './components/crear-turno/crear-turno.component';


@NgModule({
  declarations: [
    PanelComponent,
    TablaComponent,
    TablaTurnosComponent,
    PanelPacienteComponent,
    PanelDoctorComponent,
    CrearTurnoComponent
  ],
  imports: [
    CommonModule,
    PanelRoutingModule,
    UtilsModule,
    LoginModule
  ]
})
export class PanelModule { }

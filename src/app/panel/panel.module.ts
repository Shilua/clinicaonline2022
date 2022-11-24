import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import localeEs from '@angular/common/locales/es'
import { registerLocaleData } from '@angular/common';
import { PanelRoutingModule } from './panel-routing.module';
import { PanelComponent } from './panel.component';
import { TablaComponent } from './components/tabla/tabla.component';
import { UtilsModule } from '../utils/utils.module';
import { LoginModule } from '../login/login.module';
import { TablaTurnosComponent } from './components/tabla-turnos/tabla-turnos.component';
import { PanelPacienteComponent } from './components/panel-paciente/panel-paciente.component';
import { PanelDoctorComponent } from './components/panel-doctor/panel-doctor.component';
import { CrearTurnoComponent } from './components/crear-turno/crear-turno.component';
import { PanelAdminComponent } from './components/panel-admin/panel-admin.component';
import { UsersTablesComponent } from './components/users-tables/users-tables.component';
import { TurnosEspecialistaTablesComponent } from './components/turnos-especialista-tables/turnos-especialista-tables.component';
import { TurnosPacienteTablesComponent } from './components/turnos-paciente-tables/turnos-paciente-tables.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TurnosAdministradorTablesComponent } from './components/turnos-administrador-tables/turnos-administrador-tables.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { FiltroPipe } from '../pipes/filtro.pipe';
import { PacientesComponent } from './components/pacientes/pacientes.component';
import { VistaPacientesComponent } from './components/vista-pacientes/vista-pacientes.component';
import { TurnosPacientesPipe } from '../pipes/turnos-pacientes.pipe';
import { ChartsComponent } from './components/charts/charts.component';
import '@fortawesome/fontawesome-free/js/all.js';

registerLocaleData(localeEs);
@NgModule({
  declarations: [
    PanelComponent,
    TablaComponent,
    TablaTurnosComponent,
    PanelPacienteComponent,
    PanelDoctorComponent,
    CrearTurnoComponent,
    PanelAdminComponent,
    UsersTablesComponent,
    TurnosEspecialistaTablesComponent,
    TurnosPacienteTablesComponent,
    TurnosAdministradorTablesComponent,
    MyProfileComponent,
    FiltroPipe,
    TurnosPacientesPipe,
    PacientesComponent,
    VistaPacientesComponent,
    ChartsComponent
  ],
  imports: [
    CommonModule,
    PanelRoutingModule,
    UtilsModule,
    LoginModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'es'} // Añades esta línea en los providers
  ],
})
export class PanelModule { }

import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../guards/admin.guard';
import { EspecialistaGuard } from '../guards/especialista.guard';
import { PacienteGuard } from '../guards/paciente.guard';
import { RegisterComponent } from '../login/register/register.component';
import { CrearTurnoComponent } from './components/crear-turno/crear-turno.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { PanelAdminComponent } from './components/panel-admin/panel-admin.component';
import { PanelDoctorComponent } from './components/panel-doctor/panel-doctor.component';
import { PanelPacienteComponent } from './components/panel-paciente/panel-paciente.component';
import { TurnosAdministradorTablesComponent } from './components/turnos-administrador-tables/turnos-administrador-tables.component';
import { TurnosEspecialistaTablesComponent } from './components/turnos-especialista-tables/turnos-especialista-tables.component';
import { TurnosPacienteTablesComponent } from './components/turnos-paciente-tables/turnos-paciente-tables.component';
import { UsersTablesComponent } from './components/users-tables/users-tables.component';
import { PanelComponent } from './panel.component';

const routes: Routes = [
  {path: '', component: PanelComponent, children: [
    { 
      path: 'admin', component: PanelAdminComponent, children: [
        {path: 'users', component: UsersTablesComponent},
        {path: 'crear-usuario', component: RegisterComponent},
        {path: 'crear-turno', component: CrearTurnoComponent},
        {path: 'turnos', component:TurnosAdministradorTablesComponent}
      ], canActivate:[AdminGuard]
    },
    {
      path: 'especialista', component: PanelDoctorComponent, children: [
        {path: 'turnos-especialista', component: TurnosEspecialistaTablesComponent},
        {path:'perfil', component:MyProfileComponent}
      ], canActivate: [EspecialistaGuard]
    },
    {
      path: 'paciente', component: PanelPacienteComponent, children: [
        {path: 'turnos-paciente', component: TurnosPacienteTablesComponent},
        {path: 'crear-turno', component: CrearTurnoComponent},
        {path: 'perfil', component: MyProfileComponent}
      ], canActivate: [PacienteGuard]
    }
  ]}

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelRoutingModule { }

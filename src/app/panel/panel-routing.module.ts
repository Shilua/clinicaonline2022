import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from '../login/register/register.component';
import { CrearTurnoComponent } from './components/crear-turno/crear-turno.component';
import { PanelComponent } from './panel.component';

const routes: Routes = [
  { path: '', component: PanelComponent },
  { path: 'admin', component: PanelComponent },
  { path: 'crear', component: RegisterComponent },
  {path: 'test', component:CrearTurnoComponent}

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelRoutingModule { }

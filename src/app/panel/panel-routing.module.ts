import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { PanelComponent } from './panel.component';

const routes: Routes = [
  { path: '', component: PanelComponent },
  { path: 'admin', component: PanelComponent },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelRoutingModule { }

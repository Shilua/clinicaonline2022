import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WellcomeComponent } from './components/wellcome/wellcome.component';

const routes: Routes = [
  {path: '', component:WellcomeComponent},
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'panel', loadChildren: () => import('./panel/panel.module').then(m => m.PanelModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

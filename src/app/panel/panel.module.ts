import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanelRoutingModule } from './panel-routing.module';
import { PanelComponent } from './panel.component';
import { TablaComponent } from './components/tabla/tabla.component';
import { UtilsModule } from '../utils/utils.module';


@NgModule({
  declarations: [
    PanelComponent,
    TablaComponent
  ],
  imports: [
    CommonModule,
    PanelRoutingModule,
    UtilsModule
    
  ]
})
export class PanelModule { }

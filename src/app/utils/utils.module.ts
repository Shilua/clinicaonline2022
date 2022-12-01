import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastContainerComponent } from './toast-container/toast-container.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CompleteTheWordComponent } from './complete-the-word/complete-the-word.component';
import { CaptchaDirective } from './directives/captcha.directive';



@NgModule({
  declarations: [
    ToastContainerComponent,
    NavBarComponent,
    CompleteTheWordComponent,
    CaptchaDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  exports : [
    ToastContainerComponent,
    NavBarComponent,
    CompleteTheWordComponent,
    CaptchaDirective
  ]
})
export class UtilsModule { }

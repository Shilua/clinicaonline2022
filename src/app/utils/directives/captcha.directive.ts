import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Event } from '@angular/router';

@Directive({
  selector: 'input[appCaptcha]'
})
export class CaptchaDirective {
  @Input() text:any;
  @Output() validEvent:EventEmitter<Boolean> = new EventEmitter<Boolean>();
  constructor(private readonly elRef: ElementRef) { }
  @HostListener('input',['$event'])
  onChangeInput(event:Event) {
    const value = this.elRef.nativeElement.value;
    if(value != ''){
      if(value.toLocaleLowerCase() == this.text){
        this.validEvent.emit(true)
      }
    }
  }
}

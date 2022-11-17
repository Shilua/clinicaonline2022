import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Turno } from 'src/app/classes/turno';
import { User } from 'src/app/classes/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-tabla-turnos',
  templateUrl: './tabla-turnos.component.html',
  styleUrls: ['./tabla-turnos.component.css']
})
export class TablaTurnosComponent implements OnInit {
  @Input() turnos:Array<Turno> = new Array<Turno>();
  @Output() selectedAcction: EventEmitter<any> = new EventEmitter<any>()
  user:User = new User();
  constructor(private authSvc:AuthService) {
    this.user = authSvc.anUser;
   }

   enviarAccion(accion:string, turno:Turno){
    let data = {
      'turno' : turno,
      'action' : accion
    }
    this.selectedAcction.emit(data);
   }

  ngOnInit(): void {
  }

}

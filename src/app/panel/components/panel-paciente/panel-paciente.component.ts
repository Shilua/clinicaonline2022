import { Component, OnInit } from '@angular/core';
import { Turno } from 'src/app/classes/turno';
import { AuthService } from 'src/app/services/auth.service';
import { TurnosService } from 'src/app/services/turnos.service';

@Component({
  selector: 'app-panel-paciente',
  templateUrl: './panel-paciente.component.html',
  styleUrls: ['./panel-paciente.component.css']
})
export class PanelPacienteComponent implements OnInit {
  turnos:Array<Turno> = new Array<Turno>();
  constructor(
    private turnoSrv:TurnosService,
    private authSrv:AuthService
  ) {
      this.turnoSrv.getElements()
        .where('pacienteEmail', '==', this.authSrv.anUser.email)
        .where('isDelete', '==', 'false').get().then(
          response => {
            response.docs.map(
              (element:any)=>{
                let data = element.data();
                let turno:Turno = new Turno();
                turno.id = element.id;
                turno.especialidad = data.especialidad;
                turno.especialista = data.especialista;
                turno.especialistaEmail = data.especialistaEmail;
                turno.fecha = data.fecha;
                turno.paciente = data.paciente;
                turno.pacienteEmail = data.pacienteEmail;
                this.turnos.push(turno);
              }
            )
          }
        )
   }

  ngOnInit(): void {
  }

}

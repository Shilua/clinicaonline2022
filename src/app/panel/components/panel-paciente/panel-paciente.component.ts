import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
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
    private router:Router,
    private translate:TranslateService
  ) {
    this.translate.use('es');
   }

   navigate(link:string){
    this.router.navigate(['panel/paciente/'+link]);
  }

  logOut(){
    this.router.navigate(['/'])
  }

  ngOnInit(): void {
  }

}

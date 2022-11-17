import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Turno } from 'src/app/classes/turno';
import { AuthService } from 'src/app/services/auth.service';
import { TurnosService } from 'src/app/services/turnos.service';

@Component({
  selector: 'app-panel-doctor',
  templateUrl: './panel-doctor.component.html',
  styleUrls: ['./panel-doctor.component.css']
})
export class PanelDoctorComponent implements OnInit {

  constructor(private router:Router) {
   
   }

   navigate(link:string){
    this.router.navigate(['panel/especialista/'+link]);
  }

  logOut(){
    this.router.navigate(['/'])
  }

  ngOnInit(): void {
  }

}

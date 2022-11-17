import { Component, OnInit } from '@angular/core';
import { disableDebugTools } from '@angular/platform-browser';
import { Horario } from 'src/app/classes/horario';
import { User } from 'src/app/classes/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  loginUser:User = new User();
  horarios:Array<Horario> = new Array<Horario>();
  daysBySpeciality:Map<any,Array<any>> = new Map<any,Array<any>>()
  arrayLunes:Array<Boolean> = new Array<Boolean>(false,false,false,false,false,false);

  constructor(
    private authSvc:AuthService
  ) { 
    //this.daysBySpeciality.set('test', this.arrayLunes);
    this.loginUser = this.authSvc.anUser;
  
    if (this.loginUser.profile == 'Especialista') {
      
      this.loginUser.speciality.forEach(speciality => {
        this.horarios.push(new Horario());
        this.horarios.push(new Horario());
        let days:Array<any> = new Array<any>();
        let dias:Array<Boolean> = new Array<Boolean>();
        dias.push(false,false,false,false,false,false);
        days= this.loginUser.especialistaDays.get(speciality);
        days.forEach(day=> {
          if (day == 'Lunes') {
            
            dias[0] = true;
          } else if (day == 'Martes') {
            dias[1] = true;
          } else if (day == 'Miercoles') {
            dias[2] = true;
          } else if (day == 'Jueves') {
            dias[3] = true;
          } else if (day == 'Viernes') {
            dias[4] = true;
          } else {
            dias[5] = true;
          }
          ;
        });
        console.log(dias)
        this.daysBySpeciality.set(speciality,dias)
      });
    }
  }

  seleccionarDia(especialidad:any,index:any){
    let dias:Array<any> = new Array<any>()
    dias = this.daysBySpeciality.get(especialidad)!;
    dias[index] = !dias[index]
  }

  actualizarDiaYHora(especialidad:any){
    
  }
  actualizarHorarios(especialidad:any,index:any){
    let dias:Array<any> = new Array<any>();
    dias = this.daysBySpeciality.get(especialidad)!;
    let horariosNuevos:Array<Horario> = new Array<Horario>();
    horariosNuevos.push(this.horarios[index], this.horarios[index+1]);

  }
  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Turno } from 'src/app/classes/turno';
import { User } from 'src/app/classes/user';
import { AuthService } from 'src/app/services/auth.service';
import { EspecialidadesService } from 'src/app/services/especialidades.service';
import { ToastService } from 'src/app/services/toast.service';
import { TurnosService } from 'src/app/services/turnos.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-crear-turno',
  templateUrl: './crear-turno.component.html',
  styleUrls: ['./crear-turno.component.css']
})
export class CrearTurnoComponent implements OnInit {
  //formRegister : FormGroup;
  specialists:Array<User> = new Array<User>();
  turnos:Array<Turno> = new Array<Turno>();

  especialidades:Array<string> = new Array<string>();
  especialidadSeleccionada:string = '';
  diaSeleccionado:string = '';
  fechaTurno:Date = new Date();
  especialistaSeleccionado:User = new User();
  horarios:Array<string> = new Array<string>();
  constructor(
    private authSvc:AuthService, 
    private userSvc:UserService,
    private specialitySvc:EspecialidadesService,
    private turnoSvc:TurnosService,
    private router: Router,
    private toastService:ToastService
  ) {
    this.specialitySvc.getElements().where('isDelete', '==', false).get().then(
      snapshot => {
        snapshot.docs.map((element:any)=>{
          this.especialidades.push(element.data().especialidad);
          
        })
      }
    )
   }

  ngOnInit(): void {
  }
  seleccionarEspecialidad(especialidad:string){
    this.especialidadSeleccionada = especialidad;
    this.busqueda(this.especialidadSeleccionada);
    let date = new Date();
    let day = date.getDay();
    console.log(day)
  }

  seleccionarDia(dia:string){
    this.diaSeleccionado = dia;
    let hora = 8;
    for (let index = 0; index < 22; index++) {
      
      let minutos = index%2 ? '30': '00'
      let horario = hora+ ':' + minutos;
      if(index%2) hora = hora + 1;
      
      this.horarios.push(horario)
      
    }
  }

  seleccionarHora(hora:string){
    let dateTime = [];
    dateTime = hora.split(':');
    let date:Date = new Date(2022,11,2,Number(dateTime[0]), Number(dateTime[1]));
    console.log(date);
  }

  seleccionarEspecialista(especialista:User){
    this.especialistaSeleccionado = especialista;
    console.log(
        this.especialistaSeleccionado.days)
    this.turnoSvc.getElements().where('especialistaEmail', '==', especialista.email).get().then(
      snapshot =>{
        snapshot.docs.map(
          (element:any)=>{
            let turno = new Turno();
            let data = element.data();
            turno.id = element.id;
            turno.especialidad = data.especialidad;
            turno.especialista =data.especialista;
            turno.especialistaEmail = data.especialistaEmail;
            turno.estado = data.estado;
            turno.fecha = data.fecha;
            turno.isDelete = data.isDelete;
            turno.paciente = data.paciente;
            turno.pacienteEmail = turno.pacienteEmail;
            this.turnos.push(turno);
          }
        )
      }
    )
  }
  busqueda( especialidad:string):void{
    let usuarios:Array<User> = new Array<User>();
    this.userSvc.getElements()
      .where('profile', '==', 'Especialista')
      .where('isDelete','==', false)
      .where('speciality', 'array-contains', especialidad)
      .get().then(
      snapshot => {
        snapshot.docs.map(
          (element:any) => {
            let user:User = new User();
            let data = element.data();
            user.id = element.id;
            user.fistName = data.fistName;
            user.lastName = data.lastName;
            user.age = data.age;
            user.dni = data.dni;
            user.email = data.email;
            user.password = data.password;
            user.profile = data.profile;
            user.profileImgOne = data.profileImgOne;
            user.isActive = data.isActive;
            user.days = data.days;
            this.userSvc.getProfilePhoto(data.profileImgOne).then(
              img => {
                user.imageOne = img;
              }
            )
            usuarios.push(user);
            this.specialists = usuarios;
          }
        )
      }
    )
  } 

}

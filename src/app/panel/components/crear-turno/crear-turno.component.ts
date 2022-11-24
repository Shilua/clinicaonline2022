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
  specialists:Array<User> = new Array<User>();
  pacientes:Array<User> = new Array<User>();
  turnos:Array<Turno> = new Array<Turno>();
  loginUser:User = new User();
  pacienteSeleccionado:User = new User();
  especialidades:Array<string> = new Array<string>();
  especialidadSeleccionada:string = '';
  diaSeleccionado:Date = new Date();
  fechaTurno:Date = new Date();
  especialistaSeleccionado:User = new User();
  horarios:Array<string> = new Array<string>();
  fechas:Array<Date> = new Array<Date>();
  constructor(
    private authSvc:AuthService, 
    private userSvc:UserService,
    private specialitySvc:EspecialidadesService,
    private turnoSvc:TurnosService,
    private router: Router,
    private toastService:ToastService
  ) {
    this.loginUser = this.authSvc.anUser;
    this.specialitySvc.getElements().where('isDelete', '==', false).get().then(
      snapshot => {
        snapshot.docs.map((element:any)=>{
          this.especialidades.push(element.data().especialidad);
          
        })
      }
    )
    if (this.loginUser.profile == 'Administrador') {
      this.userSvc.getElements().where('isDelete',  '==' , false)
      .where('profile', '==', 'Paciente')
      .get().then(
        snapshot => {
          snapshot.docs.map((element:any)=>{
            let paciente:User = new User();
            let data = element.data();
            paciente.id = element.id;
            paciente.fistName = data.fistName;
            paciente.lastName = data.lastName;
            paciente.age = data.age;
            paciente.dni = data.dni;
            paciente.email = data.email;
            paciente.password = data.password;
            paciente.profile = data.profile;
            paciente.profileImgOne = data.profileImgOne;
            paciente.isActive = data.isActive;
            //paciente.days = new Map(Object.entries(data.days));
            this.userSvc.getProfilePhoto(data.profileImgOne).then(
              img => {
                paciente.imageOne = img;
              }
            )
            this.pacientes.push(paciente);
          })
        }
      )
    }
   }

  ngOnInit(): void {
  }
  seleccionarEspecialidad(especialidad:string){
    this.especialidadSeleccionada = especialidad;
    this.busqueda(this.especialidadSeleccionada);
  }

  seleccionarDia(dia:Date){
    this.diaSeleccionado = dia;
    this.horarios = []
    let hora = 8;
    let tiempos = this.diaSeleccionado.getDay() >= 6 ? 12 : 22;
    let horariosTomados:Array<string> = new Array<string>();
    this.turnos.forEach(turno=>{
      let dia  = this.diaSeleccionado.getDay();
      if (turno.fecha.getDay() == dia) {
        let hora = turno.fecha.getHours()+3;
        horariosTomados.push(hora+ ':' + turno.fecha.getMinutes()+0);
      }
    })
    console.log(horariosTomados)
    for (let index = 0; index < tiempos; index++) {    
      let minutos = index%2 ? '30': '00'
      let horario = hora+ ':' + minutos;
      if (horariosTomados.includes(horario)) {
        continue;
      }
      if(index%2) hora = hora + 1;
      this.horarios.push(horario)
    }
  }

  seleccionarHora(hora:string){
    let dateTime = [];
    dateTime = hora.split(':');
    this.diaSeleccionado.setHours(Number(dateTime[0]));
    this.diaSeleccionado.setMinutes(Number(dateTime[1]));
    this.diaSeleccionado.setSeconds(0);
  }
  seleccionarPaciente(paciente:User){
    this.pacienteSeleccionado = paciente;
  }
  seleccionarEspecialista(especialista:User){
    this.especialistaSeleccionado = especialista;
    this.devolverFecha(especialista);
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
            turno.fecha = new Date(data.fecha);
            turno.isDelete = data.isDelete;
            turno.paciente = data.paciente;
            turno.pacienteEmail = turno.pacienteEmail;
            this.turnos.push(turno);
          }
        )
      }
    )
  }

  devolverFecha(especialista:User){
    
    let dates:Array<Date> = new Array<Date>();

    for (let index = 0; index < 15; index++) {
      let aDay:Date = new Date();
      aDay.setDate(aDay.getDate() + index +1)
      dates.push(aDay);
    }

    this.fechas = dates.filter(function(date){
      if(especialista.days.has(String(date.getDay()))){
        return date
      }
      return null
    })
  }

  crearTurno(){
    let turno:Turno = new Turno();
    //console.log(turno.historiaClinica.);
    turno.especialidad = this.especialidadSeleccionada;
    turno.especialista = this.especialistaSeleccionado.fistName + ' ' + this.especialistaSeleccionado.lastName;
    turno.especialistaEmail  = this.especialistaSeleccionado.email;
    
    turno.estado = 'Pendiente';
    turno.fecha = this.diaSeleccionado;
    turno.isDelete = false;
    if (this.loginUser.profile == 'Administrador') {
      turno.paciente = this.pacienteSeleccionado.fistName+ ' ' + this.pacienteSeleccionado.lastName;
      turno.pacienteEmail = this.pacienteSeleccionado.email
    }else {
      turno.paciente = this.authSvc.anUser.fistName + ' ' + this.authSvc.anUser.lastName;
      turno.pacienteEmail = this.authSvc.anUser.email;
    }
    
    this.turnoSvc.createElement(turno);

    this.toastService.show(
      'Turno creado', 
      {classname : 'bg-success text-light', delay:3000}
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
            user.days = new Map(Object.entries(data.days));
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

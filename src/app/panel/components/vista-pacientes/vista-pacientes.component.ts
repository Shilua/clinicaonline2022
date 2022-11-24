import { Component, OnInit } from '@angular/core';
import { Turno } from 'src/app/classes/turno';
import { User } from 'src/app/classes/user';
import { AuthService } from 'src/app/services/auth.service';
import { TurnosService } from 'src/app/services/turnos.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-vista-pacientes',
  templateUrl: './vista-pacientes.component.html',
  styleUrls: ['./vista-pacientes.component.css']
})
export class VistaPacientesComponent implements OnInit {
  turnos:Array<Turno> = new Array<Turno>();
  pacientes:Array<User> = new Array<User>();
  turnosByPaciente:Map<string,Array<Turno>|undefined> = new Map<string,Array<Turno>|undefined>();
  constructor(
    private userSvc:UserService,
    private turnosSvc:TurnosService,
    private authSvc:AuthService
  ) {
    this.turnosSvc.getElements()
      .where('especialistaEmail', '==', this.authSvc.anUser.email)
      .where('estado','==','Realizado')
      .get()
      .then(snapshot =>{
        snapshot.docs.map((element:any) =>{
          let turno:Turno = new Turno();
          let data = element.data();
          turno.id  = element.id;
          turno.cancelado = data.cancelado;
          turno.diagnostico = data.diagnostico;
          turno.especialidad = data.especialidad;
          turno.especialista = data.especialista;
          turno.especialistaEmail = data.especialistaEmail;
          turno.estado = data.estado;
          turno.fecha = new Date(data.fecha);
          turno.historiaClinica = new Map(Object.entries(data.historiaClinica));
          turno.isDelete = data.isDelete;
          turno.paciente = data.paciente;
          turno.pacienteEmail = data.pacienteEmail;
          turno.puntuacion = data.puntuacion;
          turno.resenia = data.resenia;
          this.userSvc.getElements()
          .where('email', "==", turno.pacienteEmail)
          .get()
          .then(
            snapshot =>{
              snapshot.docs.map((element:any)=>{
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
                this.userSvc.getProfilePhoto(data.profileImgOne).then(
                  img => {
                    user.imageOne = img;
                  }
                )
                if (this.pacientes.length == 0) {
                  this.pacientes.push(user);
                } else {
                  this.pacientes.forEach(element => {
                    if (element.email != user.email) {
                      this.pacientes.push(user);  
                    }
                  });
                }
               })
              }
            )
          this.turnos.push(turno);
        })
      })
    
   }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import { Horario } from 'src/app/classes/horario';
import { Turno } from 'src/app/classes/turno';
import { User } from 'src/app/classes/user';
import { AuthService } from 'src/app/services/auth.service';
import { TurnosService } from 'src/app/services/turnos.service';
import pdfMake from 'pdfmake/build/pdfMake';
import pfdFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pfdFonts.pdfMake.vfs;

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
  turnos:Array<Turno> = new Array<Turno>();

  constructor(
    private authSvc:AuthService,
    private turnosSvc:TurnosService
  ) { 
    //this.daysBySpeciality.set('test', this.arrayLunes);
    this.loginUser = this.authSvc.anUser;
    console.log(this.loginUser)
    if (this.loginUser.profile == 'Especialista') {
      
      this.loginUser.speciality.forEach(speciality => {
        this.horarios.push(new Horario());
        this.horarios.push(new Horario());
        let days:Array<any> = new Array<any>();
        let dias:Array<Boolean> = new Array<Boolean>();
        dias.push(false,false,false,false,false,false);
        days= this.loginUser.especialistaDays.get(speciality);
        console.log(days)
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
    } else if (this.authSvc.anUser.profile == 'Paciente') {
      this.turnosSvc.getElements()
        .where('pacienteEmail', '==', this.authSvc.anUser.email)
        .where('estado', '==', 'Realizado').get().then(snapshot =>{
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
          this.turnos.push(turno)
          })
        })
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

  createPdf(){
    let turnosPaciente = this.turnos.filter(
      turno => turno.pacienteEmail == this.authSvc.anUser.email
    )
    console.log(turnosPaciente)
    let historiasClinicas = []
    let valores = []
    turnosPaciente.forEach(turno => {
      let data = []
      data.push('--------------------------------');
      data.push('Fecha de carga: ' + turno.fecha.toLocaleDateString('es'));
      data.push('Especialidad: '+ turno.especialidad)
      data.push('Especialista: ' + turno.especialista)
      
      turno.historiaClinica.forEach((value, key) =>{
        data.push(key+ ': '+value);
      })
      historiasClinicas.push(data)
    
    });
    historiasClinicas.forEach(historiaClinica => {
      
      historiaClinica.forEach(element => {
        let valor = {}
        valor['text'] = element
        valores.push(valor)
      });
      

    });
    console.log(valores)
    const pdfDefinition: any = {
      info: {
        title: 'Historia Clinica',
        author: 'Clinica Online',
        subject: 'Historia Clinica',
        },
      content: [
        { 
          alignment: 'justify',
			    columns: [
            {
              image: 'logo',
              width: 150,
			        height: 150,
            },
            {
              text: 'Clinica Online',
              style: 'subheader'
            }
			    ]
        },
        {
          alignment: 'justify',
			    columns: [
            {
              text: 'Historia clinica de ' + this.authSvc.anUser.fistName + ' ' + this.authSvc.anUser.lastName
            },
            {
              text: 'Fecha de emision: ' + new Date().toLocaleDateString('es')
            }
			    ]
        },
        JSON.parse(JSON.stringify(valores)),
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true
        },
        subheader: {
          fontSize: 15,
          bold: true
        },
        quote: {
          italics: true
        },
        small: {
          fontSize: 8
        }
      },
      images: {
        logo: 'https://www.shutterstock.com/image-vector/medical-logo-icon-design-template-260nw-213133822.jpg',
      }
    }
    console.log(pdfDefinition)
    const pdf = pdfMake.createPdf(pdfDefinition)
    pdf.open()
  }

  ngOnInit(): void {
  }

}

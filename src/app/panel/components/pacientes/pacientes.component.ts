import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Turno } from 'src/app/classes/turno';
import { User } from 'src/app/classes/user';
import pdfMake from 'pdfmake/build/pdfMake';
import pfdFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pfdFonts.pdfMake.vfs;


@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent implements OnInit {
  @Input() pacientes:Array<User> = new Array<User>();
  @Input() turnos:Array<Turno> = new Array<Turno>();
  constructor() {
    

   }

  createPdf(paciente:User){
    let turnosPaciente = this.turnos.filter(
      turno => turno.pacienteEmail == paciente.email
    )
    console.log(turnosPaciente)
    let historiasClinicas = []
    let valores = []
    turnosPaciente.forEach(turno => {
      let data = []
      data.push('--------------------------------');
      data.push('Fecha de carga: ' + turno.fecha.toLocaleDateString('es'));
      data.push('Especialidad: '+ turno.especialidad)
      
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
              text: 'Historia clinica de ' + paciente.fistName + ' ' + paciente.lastName
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

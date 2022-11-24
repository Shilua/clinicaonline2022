import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/classes/user';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';
import * as XLSX from 'xlsx';
import '@fortawesome/fontawesome-free/js/all.js';
import { TurnosService } from 'src/app/services/turnos.service';
import pdfMake from 'pdfmake/build/pdfMake';
import pfdFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pfdFonts.pdfMake.vfs;
@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnInit {
  @Input() usuarios:Array<User> = new Array<User>();

  fileName:string = 'usuarios.xlsx';
  constructor(
    private userServ:UserService,
    private toastService:ToastService,
    private turnosSvc:TurnosService
    ) { }

  activar(user:User){
    user.isActive = true;
    this.userServ.updateElement(user);
    this.toastService.show(
      'Usuario activado', 
      {classname : 'bg-success text-light', delay:3000}
    )
  }

  exportexcel():void{
    let element = document.getElementById('table');
    const ws:XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb:XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,ws,'Sheet1');
    XLSX.writeFile(wb,this.fileName);
  }

  descargarHistoria(anUser:User){
    this.turnosSvc.getElements().where('pacienteEmail', '==',anUser.email).get().then(
      
      snapshot => {
        let historiasClinicas = []
        let valores = []
        snapshot.docs.map((element:any)=>{
          let data = []
          let turno = element.data();
          console.log(turno)
          let date:Date = new Date(turno.fecha);
          data.push('--------------------------------');
          data.push('Fecha de carga: ' + date.toLocaleDateString('es'));
          data.push('Especialidad: '+ turno.especialidad)
          data.push('Especialista: ' + turno.especialista)
          historiasClinicas.push(turno.historiaClinica)
          console.log(data)
          historiasClinicas.push(data)
        })
        historiasClinicas.forEach(historiaClinica => {
            let valor = {}
            valor['text'] = historiaClinica
            valores.push(valor)
          }
      
        )
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
                  text: 'Historia clinica de ' + anUser.fistName + ' ' + anUser.lastName
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
  )}
  
  ngOnInit(): void {
    
  }

}

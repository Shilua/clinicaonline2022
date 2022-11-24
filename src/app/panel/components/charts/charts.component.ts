import { Component, DoCheck, OnInit } from '@angular/core';
import {Chart, registerables} from 'node_modules/chart.js'
import { EspecialidadesService } from 'src/app/services/especialidades.service';
import { TurnosService } from 'src/app/services/turnos.service';
import { UserService } from 'src/app/services/user.service';
Chart.register(...registerables);
@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  especialidades:Array<any> = new Array<any>()
  cantidadTurnos:Array<any> = new Array<any>()
  especialistas:Array<any> = new Array<any>()
  turnosSolicitados:Array<any> = new Array<any>()
  turnosFinalizados:Array<any> = new Array<any>()
  today:Date = new Date()
  constructor(
    private turnosSvc:TurnosService,
    private espSvc:EspecialidadesService,
    private usrSvc:UserService
  ) {
      this.espSvc.getElements().get().then(snapshot => {
        snapshot.docs.map((element:any)=>{
          this.especialidades.push(element.data().especialidad);
          let count = 0
          this.turnosSvc.getElements().where('especialidad','==', element.data().especialidad).get().then(
            snapshot => {
              snapshot.docs.map((element:any)=>{
                count ++
              })
              console.log(count)
              this.cantidadTurnos.push(count);
            }
          )
          
        })
        //this.RenderChart(this.especialidades,this.cantidadTurnos,'line','turnosPorEspecialidad')
      })

      this.usrSvc.getElements().where('profile', '==', 'Especialista').get().then(
        snapshot => {
          snapshot.docs.map((element:any) => {
            this.especialistas.push(element.data().fistName + ' ' + element.data().lastName);
            let contTurnosPorEspecialista = 0;
            let contTurnosSolicitados = 0
            let contTurnosRealizados = 0
            this.turnosSvc.getElements().where('especialistaEmail', '==', element.data().email).get().then(
              snapshot => {
                snapshot.docs.map((element:any)=> {
                  contTurnosPorEspecialista++
                })
                this.cantidadTurnos.push(contTurnosPorEspecialista)
              }
            )
            this.turnosSvc.getElements().where('especialistaEmail', '==', element.data().email)
              .get().then(
                snapshot => {
                  snapshot.docs.map(
                    (element:any)=>{
                      if (element.data().estado != 'Realizado') {
                        contTurnosSolicitados++
                      } else {
                        contTurnosRealizados++
                      }
                    }
                  )
                  this.turnosFinalizados.push(contTurnosRealizados)
                  this.turnosSolicitados.push(contTurnosSolicitados)
                }
              )
              


          })
            /*this.RenderChart(this.especialistas,this.cantidadTurnos,'bar','turnosPorEspecialista')
            this.RenderChart(this.especialistas,this.turnosFinalizados,'bar','turnosRealizados')
            this.RenderChart(this.especialistas,this.turnosSolicitados,'bar','turnosSolicitados')*/
        }
      )
   }
    actualizar(){
      this.RenderChart(this.especialidades,this.cantidadTurnos,'line','turnosPorEspecialidad','# turnos por especialidad')
      this.RenderChart(this.especialistas,this.cantidadTurnos,'bar','turnosPorEspecialista','# turnos por especialista')
      this.RenderChart(this.especialistas,this.turnosFinalizados,'bar','turnosRealizados','# turnos solicitados')
      this.RenderChart(this.especialistas,this.turnosSolicitados,'bar','turnosSolicitados','# turnos realizados')
    }
    RenderChart(labeldata:any,maindata:any,type:any,id:any,label:any) {
      const myChart = new Chart(id, {
        type: type,
        data: {
          labels: labeldata,
          datasets: [{
            label: label,
            data: maindata,
            backgroundColor: 'green',
            borderColor: [
              'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 1
          }]
        }
      })

    }

  ngOnInit(): void {
  }

}

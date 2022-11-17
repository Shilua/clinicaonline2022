import { Component, OnInit } from '@angular/core';
import { Turno } from 'src/app/classes/turno';
import { AuthService } from 'src/app/services/auth.service';
import { TurnosService } from 'src/app/services/turnos.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { TemplateRef, ViewChild } from '@angular/core';
import { Encuesta } from 'src/app/classes/encuesta';
import { EncuestasService } from 'src/app/services/encuestas.service';

@Component({
  selector: 'app-turnos-paciente-tables',
  templateUrl: './turnos-paciente-tables.component.html',
  styleUrls: ['./turnos-paciente-tables.component.css']
})
export class TurnosPacienteTablesComponent implements OnInit {

  turnos:Array<Turno> = new Array<Turno>();
  turno:Turno = new Turno();
  closeResult = '';
  encuesta:Encuesta = new Encuesta();
  @ViewChild('resenia') private resenia!: TemplateRef<any>;
  @ViewChild('calificarModal') private calificarModal!: TemplateRef<any>;
  @ViewChild('encuestaModal') private encuestaModal!: TemplateRef<any>;


  constructor(
    private turnoSrv:TurnosService,
    private authSrv:AuthService,
    private modalService: NgbModal,
    private encuestaSrv:EncuestasService
  ) {
      this.turnoSrv.getElements()
        .where('pacienteEmail', '==', this.authSrv.anUser.email)
        .where('isDelete', '==', false).get().then(
          response => {
            response.docs.map(
              (element:any)=>{
                let data = element.data();
                let turno:Turno = new Turno();
                turno.id = element.id;
                turno.especialidad = data.especialidad;
                turno.especialista = data.especialista;
                turno.especialistaEmail = data.especialistaEmail;
                turno.fecha = new Date(data.fecha);
                turno.paciente = data.paciente;
                turno.pacienteEmail = data.pacienteEmail;
                turno.estado = data.estado;
                turno.resenia = data.resenia;
                turno.cancelado = data.cancelado;
                turno.diagnostico = data.diagnostico;
                this.turnos.push(turno);
              }
            )
          }
        )
   }

   handleAction(data:any){
    console.log(data)
    let accion = data.action;
    if (accion == 'cancelarTurno') {
      this.cancelarTurno(data.turno);
    } else if(accion == 'verResenia'){
      this.verResenia(data.turno);
    } else if(accion == 'calificar'){
      this.calificar(data.turno)
    }else {
      this.completarEncuesta(data.turno);
    }
   }

   completarEncuesta(data:any){
    this.turno  =  data;
    this.modalService.open(this.encuestaModal, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
   }

   cancelarTurno(data:any){
    this.turno  =  data;
    this.turno.estado = 'Cancelado';
    this.turnoSrv.updateElement(this.turno);
   }

  enviarCalificacion(){
    this.turnoSrv.updateElement(this.turno);
  }

  enviarEncuesta(){
    this.encuesta.especialista = this.turno.especialista;
    this.encuesta.especialistaEmail = this.turno.especialistaEmail;
    this.encuesta.paciente = this.turno.paciente;
    this.encuesta.pacienteEmail = this.turno.pacienteEmail;
    this.encuestaSrv.createElement(this.encuesta);
  }

   verResenia(data:any){
    this.turno = data;
    this.modalService.open(this.resenia, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
   }

   calificar(data:any){
    this.turno = data;
    this.modalService.open(this.calificarModal, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
   }


   private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}

  changeRadioValue(e:any){
    this.turno.puntuacion = e.target.value
  }

  ngOnInit(): void {
  }

}

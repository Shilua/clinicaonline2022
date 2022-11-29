import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Turno } from 'src/app/classes/turno';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';
import { TurnosService } from 'src/app/services/turnos.service';
import {KeyValue} from '@angular/common';


@Component({
  selector: 'app-turnos-especialista-tables',
  templateUrl: './turnos-especialista-tables.component.html',
  styleUrls: ['./turnos-especialista-tables.component.css']
})
export class TurnosEspecialistaTablesComponent implements OnInit {

  turnos:Array<Turno> = new Array<Turno>();
  turno:Turno = new Turno();
  closeResult:string = '';
  nuevosCampos:Array<any> = new Array<any>(0,0,0);
  @ViewChild('cancelarModal') private cancelarModal!: TemplateRef<any>;
  @ViewChild('finalizarModal') private finalizarModal!: TemplateRef<any>;
  @ViewChild('resenia') private resenia!: TemplateRef<any>;
  historiaClinica:Array<any> = new Array<any>();
  campos:any[] = []

  constructor(
    private turnoSrv:TurnosService,
    private authSrv:AuthService,
    private modalService: NgbModal,
    private toastService:ToastService,
  ) {
    this.turnoSrv.getElements()
        .where('especialistaEmail', '==', this.authSrv.anUser.email)
        .where('isDelete', '==', false)
        .get().then(
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
                turno.diagnostico = data.diagnostico
                turno.historiaClinica = new Map(Object.entries(data.historiaClinica));
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
      this.mostrarCancelarModal(data.turno);
    }else if(accion == 'rechazarTurno'){
      this.rechazarTurno(data.turno);
    }else if(accion == 'aceptarTurno'){
      this.aceptarTurno(data.turno);
    } else if(accion == 'finalizarTurno'){
      this.mostrarFinalizarModal(data.turno);
    } else{
      this.verResenia(data.turno);
    }
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

   rechazarTurno(data:any){
    this.turno = data;
    this.turno.estado = 'Rechazado';
    this.turnoSrv.updateElement(this.turno);
    this.toastService.show(
      'Se rechazo un turno', 
      {classname : 'bg-success text-light', delay:3000}
    )
   }

   finalizarTurno(){
    this.turno.estado = 'Realizado';
    console.log(this.historiaClinica)
    const obj = Object.entries(this.historiaClinica); 
    obj.forEach(element => {
      this.turno.historiaClinica.set(element[0],element[1]);
    });
    this.turnoSrv.updateElement(this.turno);
    this.toastService.show(
      'Se finalizo un turno y se cargo reseña e historia clinica', 
      {classname : 'bg-success text-light', delay:3000}
    )
   }

   aceptarTurno(data:any){
    this.turno = data;
    this.turno.estado = 'Aceptado';
    this.turnoSrv.updateElement(this.turno);
    this.toastService.show(
      'Se acepto un turno', 
      {classname : 'bg-success text-light', delay:3000}
    )
   }

   mostrarFinalizarModal(data:any){
    this.turno = data;
    this.modalService.open(this.finalizarModal, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
   }

   mostrarCancelarModal(data:any){
    this.turno = data;
    this.modalService.open(this.cancelarModal, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
   }

   cancelarTurno(){
    this.turno.estado = 'Cancelado';
    this.turnoSrv.updateElement(this.turno);
    this.toastService.show(
      'Se creo un turno', 
      {classname : 'bg-success text-light', delay:3000}
    )
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

  ngOnInit(): void {
  }

}

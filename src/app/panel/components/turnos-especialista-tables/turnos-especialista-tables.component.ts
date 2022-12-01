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
  nuevosCampos:number = 0
  maxCampos:Boolean = false;
  disabledButton:Boolean = false;
  nombresCampos = ['ew','','']
  valoresCampos = ['','','']
  test:string = ''

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
   agregarCampo(){
    let row = document.createElement('div');  
      row.className = 'row';
      row.innerHTML = `
      <div class="col-md-6">
        <label for="">nombre campo</label>
          <input type="text" class="form-control" id="nombreCampo` + this.nuevosCampos + `" >
      </div>
      <div class="col-md-6">
        <label for="">valor campo</label>
        <input type="text" class="form-control " id="valorCampo` + this.nuevosCampos + `">
      </div>	`;
      document.querySelector('.showInputField').appendChild(row);
      if (this.nuevosCampos == 2) {
        this.maxCampos = true
      }
      
      this.nuevosCampos++
   }

   agregarCamposEspecificos(){
    let row = document.createElement('div');  
      row.className = 'row';
      row.innerHTML = `
      <div class="col-md-12">
				<label for="">nombre campo</label>
        		<input type="text" class="form-control" id="nombreSlider">
			</div>
			<div class="col-md-12">
				<label for="valorSlider" class="form-label">rango de 0 a 100</label>
				<input type="range" class="form-range" min="0" max="100" step="1" id="valorSlider" value=0 >	
			</div>
			<div class="col-md-6">
				<label for="">nombre campo</label>
        		<input type="text" class="form-control" id="nombreNumber">
			</div>
			<div class="col-md-6">
      <label for="">Valor numerico</label>
				<input type="number" class="form-control" id="valorNumber">
			</div>
			<div class="col-md-6">
				<label for="">nombre campo</label>
        		<input type="text" class="form-control" id="nombreCheck">
			</div>
			<div class="col-md-6 ">
				<div class="form-check form-switch form-check-reverse" style="padding-top: 25px;">
					<input class="form-check-input" type="checkbox" id="valorCheck">
					<label class="form-check-label" for="valorCheck">No o Si</label>
				</div>
			</div>`;
      document.querySelector('.showInputFieldSpecific').appendChild(row);
      this.disabledButton = true;
   }

   finalizarTurno(){
    this.turno.estado = 'Realizado';
    const obj = Object.entries(this.historiaClinica); 
    obj.forEach(element => {
      this.turno.historiaClinica.set(element[0],element[1]);
    });
    for (let index = 0; index < this.nuevosCampos; index++) {
      
      let campo = (<HTMLInputElement>document.getElementById('nombreCampo'+index))
      let valor = (<HTMLInputElement>document.getElementById('valorCampo'+index))
      console.log(campo)
      if(campo.value != ''){
        this.turno.historiaClinica.set(campo.value,valor.value);
      }
    }
    let nombreSlider = (<HTMLInputElement>document.getElementById('nombreSlider'))
    if (nombreSlider) {
      let valorSlider = (<HTMLInputElement>document.getElementById('valorSlider'))
      console.log(valorSlider)
      this.turno.historiaClinica.set(nombreSlider.value,valorSlider.value);
    }
    let nombreNumber = (<HTMLInputElement>document.getElementById('nombreNumber'))
    if (nombreNumber) {
      let valorNumber = (<HTMLInputElement>document.getElementById('valorNumber'))
      this.turno.historiaClinica.set(nombreNumber.value,valorNumber.value);
    }

    let nombreCheck = (<HTMLInputElement>document.getElementById('nombreCheck'))
    if (nombreCheck) {
      let valorCheck = (<HTMLInputElement>document.getElementById('valorCheck'))
      let valor = 'no'
      if (valorCheck.value = 'on') {
        valor = 'si'
      }
      this.turno.historiaClinica.set(nombreCheck.value,valor);
    }


    console.log(this.turno);
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

import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Turno } from 'src/app/classes/turno';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';
import { TurnosService } from 'src/app/services/turnos.service';

@Component({
  selector: 'app-turnos-administrador-tables',
  templateUrl: './turnos-administrador-tables.component.html',
  styleUrls: ['./turnos-administrador-tables.component.css']
})
export class TurnosAdministradorTablesComponent implements OnInit {
  turnos:Array<Turno> = new Array<Turno>();
  turno:Turno = new Turno();
  closeResult:string = '';
  @ViewChild('cancelarModal') private cancelarModal!: TemplateRef<any>;

  constructor(
    private turnoSrv:TurnosService,
    private authSrv:AuthService,
    private modalService: NgbModal,
    private toastService:ToastService,
  ) { 
    this.turnoSrv.getElements()
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
    }
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
      'Turno cancelado', 
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

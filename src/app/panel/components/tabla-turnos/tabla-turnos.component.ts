import { Component, Input, OnInit } from '@angular/core';
import { Turno } from 'src/app/classes/turno';

@Component({
  selector: 'app-tabla-turnos',
  templateUrl: './tabla-turnos.component.html',
  styleUrls: ['./tabla-turnos.component.css']
})
export class TablaTurnosComponent implements OnInit {
  @Input() turnos:Array<Turno> = new Array<Turno>();
  constructor() { }

  ngOnInit(): void {
  }

}

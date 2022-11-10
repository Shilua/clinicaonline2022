import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Turno } from '../classes/turno';

@Injectable({
  providedIn: 'root'
})
export class TurnosService {

  constructor(
    private firestore: AngularFirestore,
    public fireStorage: AngularFireStorage,
  ) { }

  getElements(){
    return this.firestore.collection('turnos').ref;
  }

  updateElement(turno:Turno){
    this.firestore.collection('turnos').doc(turno.id).update(
      JSON.parse(JSON.stringify(turno))
    );
  }

  createElement(turno:Turno){
    this.firestore.collection('turnos').add(JSON.parse(JSON.stringify(turno)));
  }

  deleteElement(turno:Turno){
    turno.isDelete = true;
    this.firestore.collection('turnos').doc(turno.id).update(JSON.parse(JSON.stringify(turno)));
  }
}

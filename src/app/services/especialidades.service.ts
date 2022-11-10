import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Especialidad } from '../classes/especialidad';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadesService {

  constructor(
    private firestore: AngularFirestore,
    public fireStorage: AngularFireStorage,
  ) { }

  getElements(){
    return this.firestore.collection('especialidades').ref;
  }

  updateElement(especialidad:Especialidad){
    this.firestore.collection('especialidades').doc(especialidad.id).update(
      JSON.parse(JSON.stringify(especialidad))
    );
  }

  createElement(especialidad:Especialidad){
    this.firestore.collection('especialidades').add(JSON.parse(JSON.stringify(especialidad)));
  }

  deleteElement(especialidad:Especialidad){
    especialidad.isDelete = true;
    this.firestore.collection('especialidades').doc(especialidad.id).update(JSON.parse(JSON.stringify(especialidad)));
  }
}

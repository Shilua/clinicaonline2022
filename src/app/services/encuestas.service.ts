import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Encuesta } from '../classes/encuesta';

@Injectable({
  providedIn: 'root'
})
export class EncuestasService {

  constructor(private firestore:AngularFirestore) { }

  getElements(){
    return this.firestore.collection('encuestas').ref;
  }

  updateElement(encuesta:Encuesta){
    this.firestore.collection('encuestas').doc(encuesta.id).update(
      JSON.parse(JSON.stringify(encuesta))
    );
  }

  createElement(encuesta:Encuesta){
    this.firestore.collection('encuestas').add(JSON.parse(JSON.stringify(encuesta)));
  }

  deleteElement(encuesta:Encuesta){
    encuesta.isDelete = true;
    this.firestore.collection('encuestas').doc(encuesta.id).update(JSON.parse(JSON.stringify(encuesta)));
  }
}

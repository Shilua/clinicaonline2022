import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AnyMxRecord } from 'dns';
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

  updateElement(turno:Turno){let data = JSON.parse(JSON.stringify(turno));
    let historia:any = []
    turno.historiaClinica.forEach((value:any, key:any)=>{
      let array = [key, value];
      historia.push(array);
      
    })

    const obj = Object.fromEntries(historia);
    data.historiaClinica = obj;
    this.firestore.collection('turnos').doc(turno.id).update(
      JSON.parse(JSON.stringify(data))
    );
  }

  createElement(turno:Turno){
    let data = JSON.parse(JSON.stringify(turno));
    let historia:any = []
    turno.historiaClinica.forEach((value:any, key:any)=>{
      let array = [key, value];
      historia.push(array);
      
    })

    const obj = Object.fromEntries(historia);
    data.historiaClinica = obj;
    this.firestore.collection('turnos').add(data);
  }

  deleteElement(turno:Turno){
    turno.isDelete = true;
    this.firestore.collection('turnos').doc(turno.id).update(JSON.parse(JSON.stringify(turno)));
  }
}

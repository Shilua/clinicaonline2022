import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { json } from 'express';
import { User } from '../classes/user';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private firestore: AngularFirestore,
    public fireStorage: AngularFireStorage,
    public authService: AuthService,
    public afAuth: AngularFireAuth
  ) { }

  getElements(){
    return this.firestore.collection('users').ref;
  }

  /*getElement(){
    let currUserEmail;
    let currUser;
    return new Promise((resolve, reject) => {
      this.afAuth.currentUser
        .then((response) => {
          currUserEmail = response.email;
          this.firestore
            .collection('users')
            .ref.where('email', '==', currUserEmail)
            .get()
            .then((response) => {
              currUser = response.docs[0].data();
              console.log(currUser);
              resolve(currUser);
            });
        })
        .catch((error) => {
          reject(error);
        });
    });
  }*/

  updateElement(anUser:User){
    this.firestore.collection('users').doc(anUser.id).update(
      JSON.parse(JSON.stringify(anUser))
    );
  }

  async getProfilePhoto(id: string) {
    return this.fireStorage.storage.ref(`profileImg/${id}.jpg`).getDownloadURL();
  }

  createElement(user: User, profileImgOne:any, profileImgTwo:any){
    if (profileImgOne) {
      let file = profileImgOne;
      let randomId = Math.random().toString(36).substring(2);
      user.profileImgOne = randomId;
      let fileRef = this.fireStorage.storage.ref(`profileImg/${randomId}.jpg`);
      fileRef.put(file);
    }
    if (profileImgTwo) {
      let file = profileImgTwo;
      let randomId = Math.random().toString(36).substring(2);
      user.profileImgTwo = randomId;
      let fileRef = this.fireStorage.storage.ref(`profileImg/${randomId}.jpg`);
      fileRef.put(file);
    }
    if (user.profile == "Paciente") {
      user.isActive = true;
    }else{
      user.isActive = false;
    }
    
    this.firestore.collection('users').add(JSON.parse(JSON.stringify(user)));
  }
}

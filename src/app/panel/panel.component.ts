import { Component, OnInit } from '@angular/core';
import { User } from '../classes/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {
  public especialistas:Array<User> = new Array<User>();
  public pacientes:Array<User> = new Array<User>();

  
  constructor(private userSrv:UserService) {
    this.busqueda('Especialista', this.especialistas);
    this.busqueda('Paciente', this.pacientes);

  }

  busqueda(filtro:string, usuarios:Array<User>):void{
    this.userSrv.getElements().where('profile', '==', filtro).get().then(
      snapshot => {
        snapshot.docs.map(
          (element:any) => {
            let user:User = new User();
            let data = element.data();
            user.id = element.id;
            user.fistName = data.fistName;
            user.lastName = data.lastName;
            user.age = data.age;
            user.dni = data.dni;
            user.email = data.email;
            user.password = data.password;
            user.profile = data.profile;
            user.profileImgOne = data.profileImgOne;
            user.isActive = data.isActive;
            this.userSrv.getProfilePhoto(data.profileImgOne).then(
              img => {
                user.imageOne = img;
              }
            )
           usuarios.push(user);
          }
        )
      }
    )
  } 
  ngOnInit(): void {
  }

}

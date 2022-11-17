import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/classes/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-tables',
  templateUrl: './users-tables.component.html',
  styleUrls: ['./users-tables.component.css']
})
export class UsersTablesComponent implements OnInit {

  public especialistas:Array<User> = new Array<User>();
  public pacientes:Array<User> = new Array<User>();
  public administradores:Array<User> = new Array<User>();


  
  constructor(private userSrv:UserService, private router:Router) {
    this.busqueda('Especialista', this.especialistas);
    this.busqueda('Paciente', this.pacientes);
    this.busqueda('Administrador', this.administradores);

  }

  busqueda(filtro:string, usuarios:Array<User>):void{
    this.userSrv.getElements().where('profile', '==', filtro).where('isDelete','==', false).get().then(
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

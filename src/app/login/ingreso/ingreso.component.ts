import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/classes/user';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.component.html',
  styleUrls: ['./ingreso.component.css']
})
export class IngresoComponent implements OnInit, OnDestroy  {

  user:User = new User();
  
  spinner:Boolean = false;
  imgs:any = new Map();
  users:Array<User> = new Array<User>();
  
  constructor(
      private authServ:AuthService,
      private userServ:UserService,
      private router:Router,
      private toastService:ToastService,        
    ) {
      setTimeout(this.spinnerTime, 2000)
      this.userServ.getElements().where('email','in' ,
      [
        'maximilanomvargas@gmail.com', 
        'wjuqnuoltjqioewjjg@tmmwj.com',
        'yahqdwqtdkdnshsnsd@tmmwj.net',
        'djfcksitoyvypjieak@tmmcv.net',
        'fzrfumjjcdhepzgyoo@tmmcv.com',
        'mynjqugysnokqfupgx@tmmbt.com'
      ]
      ).get().then(snapshot=>{
        snapshot.docs.map(
          
          (element:any)=>{
            let userAux:User = new User();
            userAux.email = element.data().email;
            userAux.password = element.data().password;
            this.userServ.getProfilePhoto(element.data().profileImgOne).then(
              img => {
                userAux.profileImgOne = img;
                this.users.push(userAux);
                console.log(this.users);
              }
            )
          }
        )
      })
     }
  spinnerTime(){
    console.log('here')
    this.spinner = true
    console.log(this.spinner)
  }
  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.toastService.clear();
  }
  login(){
    this.authServ.onLogin(this.user).then(
      response => {
        if (response?.user?.emailVerified) {
          this.userServ.getElements().where('email', '==', response.user.email).get().then(
            response => {
              response.docs.map((element:any)=>{
                let data = element.data();
                console.log(data);
                if (data.profile == 'Especialista' && !data.isActive) {
                  this.toastService.show(
                    'Su usuario no esta activado', 
                    {classname : 'bg-danger text-light', delay:3000}
                  )
                  return
                }
                
                this.user.id = element.id;
                this.user.fistName = data.fistName;
                this.user.lastName = data.lastName;
                this.user.age = data.age;
                this.user.dni = data.dni;
                this.user.email = data.email;
                this.user.password = data.password;
                this.user.profile = data.profile;
                this.user.profileImgOne = data.profileImgOne;
                this.userServ.getProfilePhoto(this.user.profileImgOne).then(
                  response=>{
                    this.user.imageOne = response;
                  }
                )
                if (this.user.profile == 'Paciente') {
                  this.user.obraSocial = data.obraSocial;
                  
                  this.user.profileImgTwo = data.profileImgTwo;
                  this.userServ.getProfilePhoto(this.user.profileImgTwo).then(
                    response=>{
                      this.user.imageTwo = response;
                    }
                  );
                }else {
                  this.user.speciality = data.speciality;
                }

                this.authServ.saveUser(this.user);
                this.router.navigate(['/panel']);
              })
            }
          ) 
          
        }else{
          this.toastService.show(
            'falta verificar su usuario', 
            {classname : 'bg-danger text-light', delay:3000}
          )
        }
      }
    )
  }

  loginWithUser(email:string,password:string){
    this.user.email = email;
    this.user.password = password;
  }

  register(){
    this.router.navigate(['/login/register']);
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../../services/auth.service";
import { UserService } from "../../services/user.service";
import { User } from '../../classes/user';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ToastService } from 'src/app/services/toast.service';
import { EspecialidadesService } from 'src/app/services/especialidades.service';
import { Especialidad } from 'src/app/classes/especialidad';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user:User = new User();
  mensaje:string = '';
  imgOneUrl:string='';
  imgTwoUrl:string='';
  especiality:string='';
  imageOne:any;
  imageTwo:any;
  token: string|undefined;
  formRegister : FormGroup;
  profile:String = '';
  especialidades:Array<string> = new Array<string>();

  constructor(
    private authSvc:AuthService, 
    private userSvc:UserService,
    private router: Router,
    private toastService:ToastService,
    private specialitySvc:EspecialidadesService
    ) {
      this.specialitySvc.getElements().where('isDelete', '==', false).get().then(
        snapshot => {
          snapshot.docs.map((element:any)=>{
            this.especialidades.push(element.data().especialidad);
            
          })
        }
      )
      this.profile = this.authSvc.anUser.profile;
      this.token = undefined
      this.formRegister = new FormGroup({
        firstName: new FormControl('',[Validators.required]),
        lastName : new FormControl('',[Validators.required]),
        age : new FormControl(0,[Validators.required]),
        dni : new FormControl(0,[Validators.required]),
        email: new FormControl('', [Validators.email, Validators.required]),
        password: new FormControl('', [ Validators.required, Validators.minLength(6)]),
        
      }
      )
   }
    
  ngOnInit() {
  }

  async onRegister(){
    this.authSvc.onRegister(this.user).then(response => {
      if (this.user.profile == 'Especialista') {
        this.user.speciality.forEach((especialidad:any) =>{
          if(!this.especialidades.includes(especialidad)){
            let espec:Especialidad = new Especialidad();
            espec.especialidad = especialidad;
            this.specialitySvc.createElement(espec);
          }
        })
      }
      this.authSvc.getCurrentUser().then((response: any) => {
      this.user.id = response.uid;
      this.userSvc.createElement(
        this.user,this.imageOne, this.imageTwo
      );
      this.authSvc.getCurrentUser().then((u:any) => u.sendEmailVerification()).then(
        () => {
          this.toastService.show(
            'Se ha registrado correctamente, se le envio un correo electronico para verificarlo,' 
            + 'si es Especialista debe esperar que lo autorice un administrador', 
            {classname : 'bg-success text-light', delay:3000}
          )
        }
      );
      //this.router.navigate(['/principal']);
    });

  }).catch(error => this.mensaje = error);
  }
 handleFirstImg(files: any) {
    this.imageOne = files.target.files[0];
  }
  handleSecondImg(files: any) {
    this.imageTwo = files.target.files[0];
  }

  /*handleProfile(profile:any){
    this.user.profile = profile;
    console.log(this.user.profile);
  }*/

  saveEspeciality(){                           
    this.user.speciality.push(this.especiality);
    //console.log(this.user.especiality);
  }

  login(){
    this.router.navigate(['/login']);
  }

  especialista(){
    if (this.user.profile == 'Paciente') {
      this.formRegister.removeControl('obraSocial');
      this.formRegister.removeControl('imageOne');
      this.formRegister.removeControl('imageTwo');

    }
    this.user.profile = 'Especialista'
    this.formRegister.addControl('imageOne', new FormControl('',[Validators.required]));
    this.formRegister.addControl('speciality' , new FormControl('',[Validators.required]))
  }

  administrador(){
    if (this.user.profile == 'Paciente') {
      this.formRegister.removeControl('obraSocial');
      this.formRegister.removeControl('imageOne');
      this.formRegister.removeControl('imageTwo');
    }
    if(this.user.profile == 'Especialista'){
      this.formRegister.removeControl('imageOne');
      this.formRegister.removeControl('speciality');
    }
    this.user.profile = 'Administrador'
    this.formRegister.addControl('imageOne', new FormControl('',[Validators.required]));
  }
  paciente(){
    if(this.user.profile == 'Especialista'){
      this.formRegister.removeControl('imageOne');
      this.formRegister.removeControl('speciality');
    }
    this.user.profile = 'Paciente'
    this.formRegister.addControl('obraSocial' , new FormControl('',[Validators.required]))
    this.formRegister.addControl('imageOne' , new FormControl('',[Validators.required]))
    this.formRegister.addControl('imageTwo' , new FormControl('',[Validators.required]))
  }

  public send(form: NgForm): void {
    if (form.invalid) {
      for (const control of Object.keys(form.controls)) {
        form.controls[control].markAsTouched();
      }
      return;
    }

    console.debug(`Token [${this.token}] generated`);
  }

}


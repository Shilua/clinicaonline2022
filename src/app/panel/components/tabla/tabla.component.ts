import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/classes/user';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnInit {
  @Input() usuarios:Array<User> = new Array<User>();
  constructor(
    private userServ:UserService,
    private toastService:ToastService
    ) { }

  activar(user:User){
    user.isActive = true;
    this.userServ.updateElement(user);
    this.toastService.show(
      'Usuario activado', 
      {classname : 'bg-success text-light', delay:3000}
    )
  }
  ngOnInit(): void {
    
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/classes/user';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnInit {
  @Input() usuarios:Array<User> = new Array<User>();

  fileName:string = 'usuarios.xlsx';
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

  exportexcel():void{
    let element = document.getElementById('table');
    const ws:XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb:XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,ws,'Sheet1');
    XLSX.writeFile(wb,this.fileName);
  }
  ngOnInit(): void {
    
  }

}

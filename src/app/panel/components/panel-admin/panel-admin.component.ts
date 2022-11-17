import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-panel-admin',
  templateUrl: './panel-admin.component.html',
  styleUrls: ['./panel-admin.component.css']
})
export class PanelAdminComponent implements OnInit {




  
  constructor( private router:Router) {

  }

  navigate(link:string){
    this.router.navigate(['panel/admin/'+link]);
  }

  logOut(){
    this.router.navigate(['/'])
  }
  
  ngOnInit(): void {
  }

}

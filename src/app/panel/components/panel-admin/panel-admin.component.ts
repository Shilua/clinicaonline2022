import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-panel-admin',
  templateUrl: './panel-admin.component.html',
  styleUrls: ['./panel-admin.component.css']
})
export class PanelAdminComponent implements OnInit {




  
  constructor( private router:Router, private translate:TranslateService) {

  }
  changeLang(lang: string) {
    this.translate.use(lang);
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

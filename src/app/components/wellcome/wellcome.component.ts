import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wellcome',
  templateUrl: './wellcome.component.html',
  styleUrls: ['./wellcome.component.css']
})
export class WellcomeComponent implements OnInit {

  constructor(private router:Router) { }

  navigate(){
    this.router.navigate(['/login/login'])
  }

  ngOnInit(): void {
  }

}

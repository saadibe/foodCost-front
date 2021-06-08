import { Router } from '@angular/router';
import { Component, OnInit, AfterViewInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  error_login = false
  identifiant = ""
  password = ""

  constructor(private router: Router) { }

  hideErrorLogin(){
    this.error_login = false
  }
  ngOnInit(): void {
    //remove permission label
    sessionStorage.removeItem('valid_admin')
  }

  login(){
    //valid login
    if( this.identifiant == "admin" && this.password == "admin"){
    sessionStorage.setItem("valid_admin", "true")
    this.error_login = false
    this.router.navigate(['accueil'])
    }
    //wrong login
    else{
      sessionStorage.setItem("valid_admin", "false")
      this.error_login = true
    }
  }

}

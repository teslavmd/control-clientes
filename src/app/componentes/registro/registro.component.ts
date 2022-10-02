import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  email : string;
  password : string;

  constructor(private router : Router,
              private flashMessages: FlashMessagesService,
              private loginServie : LoginService) { }

  ngOnInit(): void {
    this.loginServie.getAuth().subscribe( auth => {
      if(auth){
        this.router.navigate(['/']);
      }
    })
  }

  registrarse(){
    this.loginServie.register(this.email, this.password)
    .then( res => {
      this.router.navigate(['/'])
    })
    .catch(error => {
      this.flashMessages.show(error , 
      {cssClass:'alert-danger', timeout: 4000})
    })
  }

}

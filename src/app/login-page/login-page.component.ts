import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule }    from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'
import { LoginInfoSaverService } from '../login-info-saver.service'


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  @ViewChild('username') username: ElementRef;
  @ViewChild('password') password: ElementRef;
  @ViewChild('warning') warning: ElementRef;
  message: string;
  constructor(private http: HttpClient, private router:Router, private loginServ: LoginInfoSaverService) { }

  login() {
    console.log( this.username.nativeElement.value)
    let formData = new FormData();

    var loginForm = {
      email: this.username.nativeElement.value,
      password: this.password.nativeElement.value
    }

    this.http.post('http://192.168.1.86:3001/api/management/login', loginForm).subscribe(res => {
      console.log(res)
      if(res['results'] == true) {
        this.router.navigateByUrl('/homePage')
        this.loginServ.loggedIn = true
        this.loginServ.changeMsg("Logout")
      }
      if(res['results'] == false) {
        this.warning.nativeElement.insertAdjacentHTML('beforeend', `<div class="alert">Incorrect login information</div>`)
      }
    })
  }

  signUp(){
    this.router.navigateByUrl('/signUp')
  }

  ngOnInit(): void {
    this.loginServ.currentMsg.subscribe(message => this.message = message)
  }
}

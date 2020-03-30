import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule, NgModel } from '@angular/forms';
import { config } from 'rxjs';
import { Router } from '@angular/router'
import { LoginInfoSaverService } from './login-info-saver.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(private router:Router, private loginServ: LoginInfoSaverService) { }
  loggedin = this.loginServ.loggedIn
  message: string;

  ngOnInit() {
    this.loginServ.currentMsg.subscribe(message => this.message = message)
    this.router.navigateByUrl('/loginPage')
    };
}

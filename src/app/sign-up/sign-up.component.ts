import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  @ViewChild('firstName') firstName: ElementRef;
  @ViewChild('lastName') lastName: ElementRef;
  @ViewChild('password') password: ElementRef;
  @ViewChild('passwordConfirm') passwordConfirm: ElementRef;
  @ViewChild('email') email: ElementRef;
  @ViewChild('emailConfirm') emailConfirm: ElementRef;
  @ViewChild('firstNameDiv') firstNameDiv: ElementRef;
  @ViewChild('lastNameDiv') lastNameDiv: ElementRef;
  @ViewChild('passDiv') passDiv: ElementRef;
  @ViewChild('passConfDiv') passConfDiv: ElementRef; 
  @ViewChild('emailDiv') emailDiv: ElementRef;   
  @ViewChild('emailConfDiv') emailConfDiv: ElementRef;

  constructor(private http: HttpClient, private router: Router) { }

 validation(){
   if(this.password.nativeElement.value != this.passwordConfirm.nativeElement.value) {
    this.passDiv.nativeElement.insertAdjacentHTML('beforeend', `<div class="alert">Passwords do not match!</div>`)
   }
   if(this.firstName.nativeElement.value.length == 0) {
    this.firstNameDiv.nativeElement.insertAdjacentHTML('beforeend', `<div class="alert">Field not filled out!</div>`)
   }
  
   if(this.email.nativeElement.value != this.emailConfirm.nativeElement.value) {
    this.emailDiv.nativeElement.insertAdjacentHTML('beforeend', `<div class="alert">email does not match!</div>`)
    }
  }

  login() {
    this.router.navigateByUrl('/photoSelection')
  }

  signUp(){
    this.validation()
  
    let formData = new FormData();
    formData.append('signup', this.firstName.nativeElement.value)
    formData.append('signup', this.lastName.nativeElement.value)
    formData.append('signup', this.password.nativeElement.value)
   
    formData.append('signup', this.email.nativeElement.value)

    this.http.post('http://192.168.1.86:3001/api/management/signup', formData).subscribe(res => {
      console.log(res);
      
      if(res['err'] == "user added") {
        this.router.navigateByUrl('photoSelection')
        localStorage.setItem('email', this.email.nativeElement.value)
      } 
      if(res['err'] == "user exists") {
   
          this.passDiv.nativeElement.insertAdjacentHTML('beforeend', `<div class="alert">user exists</div>`)

          this.firstNameDiv.nativeElement.insertAdjacentHTML('beforeend', `<div class="alert">user exists</div>`)
         
          this.emailDiv.nativeElement.insertAdjacentHTML('beforeend', `<div class="alert">user exists</div>`)
          
      }
      if(res['err'] == "email in use") {
        this.emailDiv.nativeElement.insertAdjacentHTML('beforeend', `<div class="alert">firstname exists</div>`)
      }
    })
  }

  ngOnInit(): void {
  }

}

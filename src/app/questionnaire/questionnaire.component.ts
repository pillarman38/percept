import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  counterArr = []
  @ViewChild('photos') photos: ElementRef;

  
  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }
  counterStr = ''
 
  surveySubmit() {
    this.submitted = true;
    // stop here if form is invalid
    console.log(this.registerForm, this.registerForm.invalid)
    if (this.registerForm.invalid) {
        return;
    }
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      bio: ['', Validators.maxLength(500)],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
    console.log(localStorage.getItem('email'))
    this.http.post('http://192.168.1.86:3001/api/management/getPhotos', {email: localStorage.getItem('email')}).subscribe((res) => {
      console.log(res['res'])
      for(var i = 0; i < res['res'].length; i++) {
        this.photos.nativeElement.insertAdjacentHTML('beforeend', `<img src="${res['res'][i]['path']}" width="200" height="200">`)
      }
    })
  }
}

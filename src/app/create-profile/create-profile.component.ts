import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule }    from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
 
@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.css']
})
export class CreateProfileComponent implements OnInit {
  file;
  datas
  currentFileUpload
  constructor(private http: HttpClient){};

  changePhoto(e) {
    this.file = e.target.files
    console.log(this.file)
  }
  uploadPhoto() {
    let formData = new FormData();
    this.currentFileUpload = this.file.item(0);


    console.log(this.currentFileUpload)
    formData.set('file', this.currentFileUpload, this.currentFileUpload['name']);

    
    this.http.post('http://192.168.1.86:3001/api/photoManagement/uploadPhoto', formData).subscribe(data => {
      this.datas = data
    })
  }

  ngOnInit(): void {
  }

}

import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PhotoUploaderService } from '../photo-uploader.service';
import { $ } from 'protractor';


@Component({
  selector: 'app-photo-selector',
  templateUrl: './photo-selector.component.html',
  styleUrls: ['./photo-selector.component.css']
})
export class PhotoSelectorComponent implements OnInit {
  @ViewChild('output') outputImg: ElementRef;
  @ViewChild('photoAlbum') photoAlbum: ElementRef;
  formData = new FormData()

  constructor(private http: HttpClient, private photoServ: PhotoUploaderService) { }

  public message: string;
  imgURL: any;
  z = 0
  data;
  eve;
  arr = []

  onFileDropped($event) {
    console.log(this.z, $event.length)
    this.eve = $event
    
    // var mimeType = $event[this.z].type;
    // console.log($event[this.z]['name'])
    // if (mimeType.match(/image\/*/) == null || mimeType.match(/video\/*/)) {
    //   this.message = "Only images and videos are supported.";
    //   console.log(this.message)
    //   return;
    // }

      let reader = new FileReader();
      // console.log(reader)
      console.log($event[this.z])
      reader.readAsDataURL($event[this.z]); 

      reader.onload = (_event) => {
          var dataURI = <any> reader.result
          var byteString = atob(dataURI.split(',')[1]);
          var ab = new ArrayBuffer(byteString.length);
          var ia = new Uint8Array(ab);

          for (var ii = 0; ii < byteString.length; ii++) {
              ia[ii] = byteString.charCodeAt(ii);
          }
          
          var data = {
          blo: new Blob([ab]),
          other: $event[this.z],
          arrBuffer: dataURI
        }
          if(this.z < $event.length) {
            console.log(this.z, $event.length)
            this.z++;
            this.uploadFile(data)
            
          }
        }
      }

  imageClick($event) {
    console.log($event)
    $event.target.classList.add('profilePhoto')
  }

  uploadFile(data) {
    // console.log(data)
    this.arr.push(data)
    // console.log(this.arr)
    // console.log("hi", data, this.z)
    var blob = data['blo']
    var fileName = data['other']['name']
    var formData = new FormData()
    formData.append('photos', localStorage.getItem('email'))
    formData.append('photos', blob, fileName)
    console.log(formData)
    this.http.post('http://192.168.1.86:3001/api/management/uploadPhoto', formData).subscribe((res) => {
      console.log(res)
    })
    if(this.z == this.eve.length) {
      console.log("uploading complete!")
      this.z = 0
    } else {
      console.log(this.eve)
      this.onFileDropped(this.eve)
    }
  }

  fileBrowseHandler(files) {
    console.log(files)
  }
  
  ngOnInit(): void {
  }
}

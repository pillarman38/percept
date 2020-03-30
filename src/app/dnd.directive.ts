import { Directive, HostListener, HostBinding, Output, Input, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appDnd]'
})
export class DndDirective {

  constructor() { }

  @HostBinding('class.fileover') fileOver: boolean;
  
  @Output() fileDropped = new EventEmitter<any>();

  @HostListener('dragover', ['$event']) onDragover(evt) {
    evt.preventDefault()
   
    this.fileOver = true
    console.log('Drag over')
  }
  @HostListener('dragleave', ['$event']) onDragLeave(evt) {
    evt.preventDefault()
   

    console.log('Drag over')
  }
  @HostListener('drop', ['$event']) ondrop(evt) {
    evt.preventDefault()

    // this.fileOver = false
    const files = evt.dataTransfer.files
    if(files.length > 0){
      // console.log(`You dropeed ${files.length} files.`, files)
      this.fileDropped.emit(files)
    }
    console.log('Drag over')
  }

}

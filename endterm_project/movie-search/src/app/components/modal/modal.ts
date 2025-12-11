import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.html',
  styleUrls: ['./modal.css']
})
export class ModalComponent {
  @Input() isOpen = false;          
  @Output() isOpenChange = new EventEmitter<boolean>(); 
  
  close() {
    this.isOpen = false;
      this.isOpenChange.emit(this.isOpen); 
  }
}

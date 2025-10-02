import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './page.html',
  styleUrl: './page.css'
})

export class Page {
  //1 interpolation
  country:string='Kazakhstan';
  city:string='Almaty';

  //2 property binding
  photoURL: string='assets/me.jpg';
  isButtonDisabled: boolean = false;
  likes: number = 0;
  showExtra: boolean = false;

  //3. event binding()
  disableLike() {
    this.isButtonDisabled = true;}

  toggleMessage() {
    this.showExtra = !this.showExtra;}

  addLike() {
    this.likes++;}

    //4. Two-Way Binding
    subscribeMessage: string = '';
    email: string = '';
    subscribe() {
      if (this.email.trim()) {
        this.subscribeMessage = `🎉 Thanks, ${this.email}, we’ll be in touch!`;
        this.email = ''; 
        } else {
          this.subscribeMessage = '⚠️ Please enter a valid email!';
        }
      }
}
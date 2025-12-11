import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <h2>Sign Up</h2>
    <form [formGroup]="registerForm" (ngSubmit)="register()">
      <input type="email" placeholder="Type your email" formControlName="email">
      <div class="error" *ngIf="email.invalid && email.touched">
        Enter a valid email
      </div>
      <input type="password" placeholder="Create a password" formControlName="password">
     <div class="error" *ngIf="password.invalid && password.value">
     Password must be 8+ chars, include number & special char
     </div>
     
     <input type="password" placeholder="Repeat password" formControlName="repeatPassword">
     <div class="error" *ngIf="repeatPassword.invalid && repeatPassword.touched">
        Passwords must match
      </div>
      
      <button type="submit" [disabled]="registerForm.invalid">Sign Up</button>
      </form>
      <p>
      Already have an account? 
      <a routerLink="/login">Login</a>
    </p>
  `,
  styleUrls:['./register.css']
})

export class RegisterComponent {
    registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])/)//1 8+ chars, one special, one number
    ]),
    repeatPassword: new FormControl('', [Validators.required])
  });
  
  constructor(private auth: AuthService, private router: Router) {}

  get email() { return this.registerForm.get('email')!; }
  get password() { return this.registerForm.get('password')!; }
  get repeatPassword() { return this.registerForm.get('repeatPassword')!; }

  register() {
    if (this.password.value !== this.repeatPassword.value) {
      alert("Passwords do not match!");
      return;
    }//1
    
    this.auth.register(this.email.value!, this.password.value!).then(() => this.router.navigate(['/profile'])).catch(err => alert(err.message));
  }
}
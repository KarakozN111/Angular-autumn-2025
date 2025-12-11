import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <h2>Login</h2>
    <form [formGroup]="loginForm" (ngSubmit)="login()">
      <input type="email" placeholder="Email" formControlName="email" required>
      <input type="password" placeholder="Password" formControlName="password" required>
      <button type="submit">Login</button>
    </form>
    <p>
      Don't have an account? 
      <a routerLink="/register">Register ☑️</a>
    </p>
  `,
  styleUrls:['/login.css']
})

export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });
  constructor(private auth: AuthService, private router: Router) {}
  //1
  login() {
    const { email, password } = this.loginForm.value;
    if (!email || !password) return;

    this.auth.login(email, password)
      .then(() => this.router.navigate(['/profile']))
      .catch(err => alert(err.message));
  }
}

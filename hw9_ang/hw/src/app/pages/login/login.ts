import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FirebaseError } from 'firebase/app';

@Component({
selector: 'app-login',
standalone: true,
imports: [FormsModule, CommonModule, RouterLink],
templateUrl: `./login.html`,
styleUrls:['./login.css']
})
export class Login {
  email = '';
  password = '';
  error = '';
  loading = false;
  constructor(private auth: AuthService, private router: Router) {}
  async login() {
    this.loading = true;
    this.error = '';
    try {
      await this.auth.login(this.email, this.password);
      this.router.navigate(['/profile']);
    }
    catch (err: any) {
      console.log('Ошибка Firebase:', err);
      const code = err.code || err?.customData?.error || '';
      switch (code) {
        case 'auth/user-not-found':
          this.error = 'No user with this email.';
          break;
          case 'auth/wrong-password':
            this.error = 'Wrong password.';
            break;
          case 'auth/invalid-email':
            this.error = 'Wrong format of email.';
            break;
          case 'auth/invalid-credential':
            this.error = 'Problems with data or configuration Firebase.';
            break;
            default:
              this.error = err?.message || 'Unkowon error occured.';
            }
          }
          this.loading = false;
        }
}
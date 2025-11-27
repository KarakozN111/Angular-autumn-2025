import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { FirebaseError } from 'firebase/app';
import { RouterLink } from '@angular/router';

@Component({
selector: 'app-signup',
standalone: true,
imports: [FormsModule, CommonModule, RouterLink],
templateUrl: './signup.html',
styleUrls:['./signup.css']
})

export class Signup {
email = '';
password = '';
error = '';
loading = false;
constructor(private auth: AuthService, private router: Router) {}
async signup() {
this.loading = true;
this.error = '';
try {
  await this.auth.signup(this.email, this.password);
  this.router.navigate(['/profile']);
} 
catch (err: any) {
  if (err instanceof FirebaseError) {
    switch (err.code) {
      case 'auth/email-already-in-use':
        this.error = 'This email is already registered.';
        break;
      case 'auth/invalid-email':
        this.error = 'Wrong format of email.';
        break;
      case 'auth/weak-password':
        this.error = 'Too simple password, enter at least 6 digits';
        break;
      default:
        this.error = err.message || 'error occured, try again';
    }
  } else {
    this.error = err?.message || 'unknown error occured';
  }
}

this.loading = false;
}
}
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup {
  email = '';
  password = '';
  error = '';
  loading = false;

  constructor(private auth: AuthService, private router: Router) {}

  async onSignup() {
    this.loading = true;
    this.error = '';

    try {
      await this.auth.signup(this.email, this.password);
      this.router.navigate(['/profile']);
    } catch (err: any) {
      this.error = err.message;
    }

    this.loading = false;
  }
}

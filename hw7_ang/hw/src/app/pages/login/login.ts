import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrl: './login.css',
  standalone: true,
  imports: [FormsModule]
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
    } catch (err: any) {
      this.error = err.message;
    }

    this.loading = false;
  }
}

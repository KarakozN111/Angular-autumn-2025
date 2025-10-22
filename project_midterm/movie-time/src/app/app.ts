import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <a class="navbar-brand" [routerLink]="['/']">Movie Time</a>
      </div>
    </nav>
    <router-outlet></router-outlet>
  `
})
export class App {
  title = 'movie-time';
}
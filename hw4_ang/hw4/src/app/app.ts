import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Movielist } from './movielist/movielist';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Movielist], //
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('hw4');
}


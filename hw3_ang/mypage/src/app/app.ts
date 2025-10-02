import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Page} from './page/page'
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Page],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('mypage');
}

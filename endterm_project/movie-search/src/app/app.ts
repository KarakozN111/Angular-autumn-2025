import { Component, signal, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ModalComponent } from './components/modal/modal';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, RouterOutlet, ModalComponent, CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {  // Добавляем OnInit
  protected readonly title = signal('movie-search');
  isModalOpen = false;
  isOnline = signal(navigator.onLine);
  selectedLanguage: string = 'en';
  
  // свойство для фото профиля в шапке
  userPhotoUrl: string | null = null;

  constructor(public auth: AuthService) {
    window.addEventListener('online', () => this.isOnline.set(true));
    window.addEventListener('offline', () => this.isOnline.set(false));
  }

  // метод инициализации
  ngOnInit() {
    // Подписываемся на изменения пользователя
    this.auth.currentUser$.subscribe(async user => {
      if (user) {
        // Загружаем фото профиля
        this.userPhotoUrl = await this.auth.getUserPhoto(user.uid);
      } else {
        this.userPhotoUrl = null;  // Сбрасываем если пользователь вышел
      }
    });
  }
}
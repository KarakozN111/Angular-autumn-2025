import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { User } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
<div *ngIf="user; else loginLink" class="profile-container">
<div class="left-column">
    <h2>👤 {{ user.email }}</h2>
    <img *ngIf="photoBase64" [src]="photoBase64" class="profile-pic">

<input type="file" (change)="onFileSelected($event)" accept="image/png, image/jpeg">

<button (click)="upload()" [disabled]="!selectedFile">Upload</button>
    <button (click)="logout()" class="logout-button">Logout</button>
    <p>Click <a [routerLink]="'/favorites'">favorites</a> to see your saved movies</p>
    </div>
    
</div>
<ng-template #loginLink>
  <p>You are not logged in. <a routerLink="/login">Login</a></p>
</ng-template>

  `,
  styleUrls:['./profile.css']
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  selectedFile: File | null = null;
  photoBase64: string | null = null;
  favorites: { id: string; title: string; link: string }[] = [];

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {//observable
    this.auth.currentUser$.subscribe(u => {
      this.user = u;
      if (u) this.loadPhoto(u.uid);//10 Загрузка фото при инициализации
    });

   
  }

  async loadPhoto(uid: string) {
    const base64 = await this.auth.getUserPhoto(uid);
    this.photoBase64 = base64 || null; // Сохранение для рендеринга
  }
//1
  async logout() {
    try {
      await this.auth.logout();
      this.router.navigate(['/login']);
    } catch (err: any) {
      alert(err.message);
    }
  }
//10
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.selectedFile = input.files[0];//10 getting selected file
    }
  }

async upload() {
  if (!this.selectedFile || !this.user) return;

  try {
    const base64 = await this.auth.uploadProfilePhoto(this.selectedFile);
    this.photoBase64 = base64;
    this.selectedFile = null;
    alert('Profile picture updated!');
  } catch (err: any) {
    alert(err.message);
  }
}


}
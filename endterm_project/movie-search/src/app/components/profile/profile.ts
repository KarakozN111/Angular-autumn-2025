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
    <input type="file" (change)="onFileSelected($event)" accept="image/*">
    <button (click)="upload()" [disabled]="!selectedFile">Upload</button>
    <button (click)="logout()" class="logout-button">Logout</button>
  </div>
<div class="right-column">
  <h3>🤍 Your Favorites:</h3>
  <ul>
    <li *ngFor="let f of favorites">
      {{ f.title }}
        <button class="remove-btn" (click)="removeFavorite(f.id)">
    <i class='bx bx-trash'></i>
  </button>
    </li>
  </ul>
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

  ngOnInit() {
    this.auth.currentUser$.subscribe(u => {
      this.user = u;
      if (u) this.loadPhoto(u.uid);
    });

    this.auth.getFavorites().subscribe(favs => {
      this.favorites = favs;
    });
  }

  async loadPhoto(uid: string) {
    const base64 = await this.auth.getUserPhoto(uid);
    this.photoBase64 = base64 || null;
  }

  async logout() {
    try {
      await this.auth.logout();
      this.router.navigate(['/login']);
    } catch (err: any) {
      alert(err.message);
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.selectedFile = input.files[0];
    }
  }

  async upload() {
    if (!this.selectedFile || !this.user) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;
      await this.auth.uploadBase64(base64);

      this.photoBase64 = base64;
      this.selectedFile = null;
      alert('Profile picture updated!');
    };
    reader.readAsDataURL(this.selectedFile);
  }
  removeFavorite(id: string) {
  if (!this.user) return;
  this.auth.removeFavorite(id).then(() => {
  
    this.favorites = this.favorites.filter(f => f.id !== id);
  }).catch(err => {
    alert('Failed to remove favorite: ' + err.message);
  });
}

}
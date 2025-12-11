import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './favorites.html',
  styleUrls: ['./favorites.css']
})
export class FavoritesPage implements OnInit {

  favorites: { 
    id: string; 
    title: string; 
    link: string; 
    poster?: string;
  }[] = [];

  loading = true;

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.auth.getFavoritesMerged().subscribe(favs => {
      this.favorites = favs;// works offline and takes from localstorage 
      this.loading = false;
    });
  }

  remove(id: string) {
    this.auth.removeFavorite(id).then(() => {
      this.favorites = this.favorites.filter(f => f.id !== id);
    });
  }
}
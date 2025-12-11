import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService, Movie } from '../../services/movie';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SafeUrlPipe } from '../../safe-url.pipe';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, SafeUrlPipe],
  templateUrl: './movie-detail.html',
  styleUrls: ['./movie-detail.css']
})
//5
export class MovieDetail implements OnInit {
  movie?: Movie;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private auth: AuthService
  ) {}

ngOnInit() {
  const id = this.route.snapshot.params['id'];

  this.movieService.getMovieDetails(id).subscribe(m => {
    if (!m) return; 
    this.movie = m;

    this.movieService.getTrailerUrl(m.title).subscribe(url => {
      this.movie!.trailer = url;
    });
  });
}
//9 Добавление в избранное на странице фильма:
addToFavorites() {
  if (!this.movie) return;

  this.auth.addFavorite({
    id: this.movie.id,
    title: this.movie.title,
    link: `/movie/${this.movie.id}`,
    poster: this.movie.image || ''  // если нет изображения, ставим пустую строку
  })
  .then(() => alert('Added to Favorites!'))
  .catch(err => alert(err.message));
}



}

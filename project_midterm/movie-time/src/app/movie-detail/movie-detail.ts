import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../services/movie';
import { Movie } from '../models/models';
import { SafeUrlPipe } from '../safe-url-pipe';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule, SafeUrlPipe,  RouterModule, ],
  templateUrl: './movie-detail.html',
  styleUrls:['./movie-detail.css']
})
export class MovieDetail implements OnInit {
  movie?: Movie;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.movieService.getMovie(id)
        .subscribe(movie => this.movie = movie);
    });
  }
    handleImageError(event: any) {
    console.log('Image loading error');
    event.target.src = 'https://via.placeholder.com/400x600/667eea/ffffff?text=No+Image';
  }
}
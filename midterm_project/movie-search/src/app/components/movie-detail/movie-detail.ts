import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService, Movie } from '../../services/movie';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SafeUrlPipe } from '../../safe-url.pipe';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule, RouterModule,SafeUrlPipe],
  templateUrl: './movie-detail.html',
  styleUrls: ['./movie-detail.css']
})
export class MovieDetail implements OnInit {
  movie?: Movie;
  constructor(private route: ActivatedRoute, private movieService: MovieService) {}

ngOnInit() {
  const id = this.route.snapshot.params['id'];
  this.movieService.getMovieDetails(id).subscribe(m => {
    this.movie = m;

    this.movieService.getTrailerUrl(m.title).subscribe(url => {
      console.log('Trailer URL:', url); 
      this.movie!.trailer = url;
    });
  });
}
}

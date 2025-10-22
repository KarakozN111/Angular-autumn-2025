import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MovieService } from '../services/movie';
import { Movie } from '../models/models';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './category.html'
  ,
  styleUrls:[ './category.css']
})
export class Category implements OnInit {
  movies: Movie[] = [];
  category: string = ''; 

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.category = params['id'];
      this.movieService.getMoviesByCategory(this.category)
        .subscribe(movies => {
          this.movies = movies;
          console.log('Movies loaded:', movies); 
        });
    });
  }

  handleImageError(event: any) {
  console.warn('Image failed to load:', event.target.src);
  event.target.src = 'https://via.placeholder.com/400x600/667eea/ffffff?text=No+Image';
}

}
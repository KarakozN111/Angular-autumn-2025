import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { MovieService } from '../services/movie';
import { Movie } from '../models/models';

interface Category {
  name: string;
  displayName: string;
  image: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit {
  searchControl = new FormControl();
  searchResults: Movie[] = [];
  categories: Category[] = [
    { 
      name: 'anime', 
      displayName: 'Anime',
      image: 'https://i.pinimg.com/1200x/58/a4/0b/58a40b43b8e10195eff41a0ea2d0bbf9.jpg'
    },
    { 
      name: 'disney', 
      displayName: 'Disney',
      image: 'https://i.pinimg.com/1200x/cd/d0/5c/cdd05c40218d19c5b9dc1403abe979ed.jpg'
    },
    { 
      name: 'netflix', 
      displayName: 'Netflix',
      image: 'https://i.pinimg.com/1200x/12/d0/45/12d04587f205ba8accecb35de93f790b.jpg'
    },
    { 
      name: 'hbo', 
      displayName: 'HBO',
      image: 'https://i.pinimg.com/1200x/c7/fb/a6/c7fba6a4e4a0ec3d5d9029c759a40f17.jpg'
    },
    { 
      name: 'paramount', 
      displayName: 'Paramount',
      image: 'https://i.pinimg.com/1200x/93/89/65/9389652be5aec57e9f20a57cc48fe495.jpg'
    },
    { 
      name: 'dreamworks', 
      displayName: 'DreamWorks',
      image: 'https://i.pinimg.com/736x/9a/bd/c5/9abdc53ede4fab53d5cc75e324a37ef9.jpg'
    }
  ];

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(term => this.movieService.searchMovies(term))
      )
      .subscribe(results => {
        this.searchResults = results;
      });
  }
}
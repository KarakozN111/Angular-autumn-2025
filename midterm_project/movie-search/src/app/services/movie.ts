import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environemnt';

export interface Movie {
  id: string;
  title: string;
  description: string;
  year: string;
  director: string;
  writer?: string;
  actors?: string;
  genre?: string;
  runtime?: string;
  released?: string;
  language?: string;
  country?: string;
  awards?: string;
  rating?: string;
  metascore?: string;
  boxOffice?: string;
  trailerUrl?: string;
  category?: string;
  image?: string;
  trailer?: string;
}


@Injectable({
  providedIn: 'root'
})
export class MovieService { 
    private omdbUrl = 'https://www.omdbapi.com/';
  private omdbApiKey = environment.omdbApiKey;
  constructor(private http: HttpClient) {}
  searchMovies(term: string): Observable<Movie[]> {
    const url = `${this.omdbUrl}?apikey=${this.omdbApiKey}&s=${term}`;
    return this.http.get<any>(url).pipe(
      map(response => {
        if (!response.Search) return [];
        return response.Search.map((r: any) => ({
          id: r.imdbID,
          title: r.Title,
          year: r.Year,
          image: r.Poster !== 'N/A' ? r.Poster : 'https://via.placeholder.com/300x450',
          description: '',
          category: 'Online',
        }));
      })
    );
  }

getMovieDetails(id: string): Observable<Movie> {
  const url = `${this.omdbUrl}?apikey=${this.omdbApiKey}&i=${id}&plot=full`;
  return this.http.get<any>(url).pipe(
    map(r => ({
      id: r.imdbID,
      title: r.Title,
      year: r.Year,
      director: r.Director,
      writer: r.Writer,
      actors: r.Actors,
      genre: r.Genre,
      runtime: r.Runtime,
      released: r.Released,
      language: r.Language,
      country: r.Country,
      awards: r.Awards,
      rating: r.imdbRating,
      metascore: r.Metascore,
      boxOffice: r.BoxOffice,
      description: r.Plot,
      image: r.Poster !== 'N/A' ? r.Poster : 'https://via.placeholder.com/300x450',
      trailer: '', 
      category: 'Online'
    }))
  );
}

getMoviesByCategory(category: string): Observable<Movie[]> {
  const categoryKeywords: { [key: string]: string } = {
    'action': 'action',
    'comedy': 'comedy', 
    'drama': 'drama',
    'horror': 'horror',
    'sci-fi': 'sci-fi',
    'thriller': 'thriller'
  };
  
  const searchTerm = categoryKeywords[category] || category;
  return this.searchMovies(searchTerm);
}

getTrailerUrl(title: string): Observable<string> {
  const apiKey = environment.youtubeApiKey;

  const query = encodeURIComponent(title + ' trailer');
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&maxResults=1&key=${apiKey}`;

  return this.http.get<any>(url).pipe(
    map(res => {
      if (res.items && res.items.length > 0) {
        return `https://www.youtube.com/embed/${res.items[0].id.videoId}`;
      }
      return '';
    })
  );
}

}


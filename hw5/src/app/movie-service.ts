import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'https://api.sampleapis.com/movies/action';

  private localMovies = [
          {
        title: 'When Harry Met Sally',
        year: 1989,
        image: 'https://i.pinimg.com/1200x/2f/05/5c/2f055c425a92243f71b5e07f604f9b4c.jpg'
      },
      {
        title: 'Dead Poets Society',
        year: 1989,
        image: 'https://i.pinimg.com/736x/2c/7e/4e/2c7e4ea062319968dfe9227cc2fe97ef.jpg'
      },
      {
        title: 'You’ve Got Mail',
        year: 1998,
        image: 'https://i.pinimg.com/1200x/6b/92/cb/6b92cbf4e8c5b41d750b56d7f90d48ae.jpg'
      },
      {
        title: 'Good Will Hunting',
        year: 1997,
        image: 'https://i.pinimg.com/736x/68/bd/80/68bd8084094f8db053dc8c2192e16f97.jpg'
      },
      {
        title: 'Coraline',
        year: 2009,
        image: 'https://i.pinimg.com/736x/41/2d/9e/412d9e574b7c4aa1135d90fea7185af4.jpg'
      },
      {
        title: 'Corpse Bride',
        year: 2005,
        image: 'https://i.pinimg.com/736x/f8/50/10/f850100c5ae1355dedaa038426676013.jpg'
      },
      {
        title: 'The Nightmare Before Christmas',
        year: 1993,
        image: 'https://i.pinimg.com/736x/e4/42/51/e442513001839736a6ff301c2290cbd8.jpg'
      },
      {
        title: 'Hocus Pocus',
        year: 1993,
        image: 'https://i.pinimg.com/1200x/8e/1a/a2/8e1aa2336aeaf9d143a7183540c47ba0.jpg'
      },
       {
        title:'Sleepy hollow',
        year:1999,
        image:'https://i.pinimg.com/1200x/32/0b/fb/320bfbb6d8b773518fd5ef1957c6cc94.jpg'
      },
       {
        title:'Sweeny Todd',
        year:2007,
        image:'https://i.pinimg.com/1200x/4d/c9/6b/4dc96b5659faa20504dc87a39583fc8a.jpg'
      }
  ];

  constructor(private http: HttpClient) {}

  getMovies(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      catchError(() => of(this.localMovies)) 
    );
  }

  searchMovies(term: string): Observable<any[]> {
    if (!term.trim()) return of(this.localMovies);


    return this.http.get<any[]>(this.apiUrl).pipe(
      map((movies) =>
        movies.filter((movie) =>
          movie.title.toLowerCase().includes(term.toLowerCase())
        )
      ),
      catchError(() =>

        of(
          this.localMovies.filter((movie) =>
            movie.title.toLowerCase().includes(term.toLowerCase())
          )
        )
      )
    );
  }
}

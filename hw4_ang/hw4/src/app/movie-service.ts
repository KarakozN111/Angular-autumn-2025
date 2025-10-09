import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'https://api.sampleapis.com/movies/action';
  constructor(private http: HttpClient) {}
  getMovies(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}



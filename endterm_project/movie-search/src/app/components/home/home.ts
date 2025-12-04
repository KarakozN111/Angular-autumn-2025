import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MovieService, Movie } from '../../services/movie';
import { debounceTime, distinctUntilChanged, startWith, switchMap } from 'rxjs/operators';
import { combineLatest, Observable, of } from 'rxjs';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit {
  searchControl = new FormControl('');
  categoryControl = new FormControl('');
  page = 1;
  searchResults: Movie[] = [];
  totalResults = 0;
  showPagination = false;

  constructor(
    private movieService: MovieService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  get totalPages(): number {
    return Math.ceil(this.totalResults / 10);
  }

  ngOnInit() {
    // Инициализация значений из query params
    const initialTerm = this.route.snapshot.queryParamMap.get('term') || '';
    const initialCategory = this.route.snapshot.queryParamMap.get('category') || '';
    const initialPage = Number(this.route.snapshot.queryParamMap.get('page')) || 1;

    this.searchControl.setValue(initialTerm);
    this.categoryControl.setValue(initialCategory);
    this.page = initialPage;

    // Следим за изменением фильтров
    combineLatest([
      this.searchControl.valueChanges.pipe(
        startWith(initialTerm),
        debounceTime(300),
        distinctUntilChanged()
      ),
      this.categoryControl.valueChanges.pipe(
        startWith(initialCategory),
        distinctUntilChanged()
      )
    ])
    .pipe(
      switchMap(([term, category]) => {
        this.page = 1; // Сбрасываем страницу при смене фильтра
        this.updateUrl(term, category, this.page);
        return this.loadMovies(term || '', category || '', this.page);
      })
    )
    .subscribe(res => {
      this.searchResults = res.movies;
      this.totalResults = res.totalResults;
      this.showPagination = !!(this.searchControl.value || this.categoryControl.value);
    });

    // Следим за изменением query param page при прямом переходе по ссылке
    this.route.queryParamMap.subscribe(params => {
      const qPage = Number(params.get('page')) || 1;
      if (qPage !== this.page) {
        this.page = qPage;
        this.loadMovies(this.searchControl.value || '', this.categoryControl.value || '', this.page)
          .subscribe(res => {
            this.searchResults = res.movies;
            this.totalResults = res.totalResults;
          });
      }
    });
  }

  loadMovies(term: string = '', category: string = '', page: number = 1): Observable<{movies: Movie[], totalResults: number}> {
    if (term && term.trim() !== '') {
      return this.movieService.searchMovies(term, page);
    } else if (category) {
      return this.movieService.getMoviesByCategory(category, page);
    } else {
      return of({movies: [], totalResults: 0});
    }
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.updateUrlAndLoad();
    }
  }

  nextPage() {
    if (this.page < this.totalPages) {
      this.page++;
      this.updateUrlAndLoad();
    }
  }

  updateUrl(term = this.searchControl.value, category = this.categoryControl.value, page = this.page) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { term, category, page },
      queryParamsHandling: 'merge'
    });
  }

  updateUrlAndLoad() {
    this.updateUrl();
    this.loadMovies(this.searchControl.value || '', this.categoryControl.value || '', this.page)
      .subscribe(res => {
        this.searchResults = res.movies;
        this.totalResults = res.totalResults;
      });
  }
}

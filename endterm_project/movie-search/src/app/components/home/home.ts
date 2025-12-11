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
//5
export class Home implements OnInit {
  searchControl = new FormControl(''); // 3 реактивный контрол для поиска с пустым значением
  categoryControl = new FormControl('');//контрол для выбора категории 
  page = 1;// текующая страница пагинации начинаюзая с 1
  searchResults: Movie[] = [];//массив найденных фильмов
  totalResults = 0;//общ колво результатов для пагинации
  showPagination = false;

  constructor(
    private movieService: MovieService, //сервис для работы с апи
    private router: Router,// для навигации и изменения юрл
    private route: ActivatedRoute//получение параметров из текущего юрл
  ) {}
//4 overall pages 
  get totalPages(): number {
    return Math.ceil(this.totalResults / 10);
  }

  ngOnInit() {
    // 4 Query parameters в URL
    //7 Использование snapshot для начальных значений:
    const initialTerm = this.route.snapshot.queryParamMap.get('term') || ''; //параметры юрл
    const initialCategory = this.route.snapshot.queryParamMap.get('category') || '';
    const initialPage = Number(this.route.snapshot.queryParamMap.get('page')) || 1;

    this.searchControl.setValue(initialTerm);
    this.categoryControl.setValue(initialCategory);
    this.page = initialPage;

    // 4,7 RxJS операторы для поиска:
    combineLatest([
      this.searchControl.valueChanges.pipe(
        startWith(initialTerm),
        debounceTime(300),//7
        distinctUntilChanged()//7
      ),
      this.categoryControl.valueChanges.pipe(
        startWith(initialCategory),
        distinctUntilChanged()
      )
    ])
    .pipe(
      switchMap(([term, category]) => {//7
        this.page = 1; // Сбрасываем страницу при смене фильтра
        this.updateUrl(term, category, this.page);
        return this.loadMovies(term || '', category || '', this.page);
      })
    )
    .subscribe(res => { //сохрняем фильмы и 
      this.searchResults = res.movies;
      this.totalResults = res.totalResults;
      this.showPagination = !!(this.searchControl.value || this.categoryControl.value);
    });

    // 4 Поддержка прямых переходов по URL:
    //7 Observables из ActivatedRoute для query params
    this.route.queryParamMap.subscribe(params => {// observable from activated route 
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
// 4
  loadMovies(term: string = '', category: string = '', page: number = 1): Observable<{movies: Movie[], totalResults: number}> {
    if (term && term.trim() !== '') {
      return this.movieService.searchMovies(term, page);
    } else if (category) {
      return this.movieService.getMoviesByCategory(category, page);
    } else {
      return of({movies: [], totalResults: 0});
    }
  }
// 4
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
// 4 Обновление URL при поиске
  updateUrlAndLoad() {
    this.updateUrl();
    this.loadMovies(this.searchControl.value || '', this.categoryControl.value || '', this.page)
      .subscribe(res => {
        this.searchResults = res.movies;
        this.totalResults = res.totalResults;
      });
  }
}

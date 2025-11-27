import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ItemsService {
  //1 
  private base = 'https://dummyjson.com/products';

  constructor(private http: HttpClient) {}
  //1
  getItems(query?: string): Observable<any[]> {
    if (query) {// Если есть поисковый запрос
      const params = new HttpParams().set('q', query);
      // Создаём параметры запроса ?q=searchTerm
      return this.http.get<any>(`${this.base}/search`, { params })
        .pipe(map(r => r.products));
    }
    return this.http.get<any>(this.base)
      .pipe(map(r => r.products));
  }
//1
  getItemById(id: string | number): Observable<any> {
    return this.http.get(`${this.base}/${id}`);
  }
  getAllItems(): Observable<any[]> {
    // Метод для получения всех товаров из нескольких категорий сразу
  return forkJoin([
    this.getCategoryItems('fragrances'),
    this.getCategoryItems('skincare'),
    this.getCategoryItems('home-decoration'),
    this.getCategoryItems('groceries'),
    this.getCategoryItems('tops'),
    this.getCategoryItems('womens-dresses')
    // forkJoin ждёт все запросы одновременно, а map объединяет массивы товаров в один
  ]).pipe(
    map(([fragrances, skincare, home, groceries, tops, dresses]) => [
      ...fragrances,
      ...skincare,
      ...home,
      ...groceries,
      ...tops,
      ...dresses
    ])
  );
}

getCategoryItems(category: string): Observable<any[]> {
   // Метод для получения товаров конкретной категории
  return this.http.get<any>(`${this.base}/category/${category}`)
    .pipe(map(r => r.products));
}



}
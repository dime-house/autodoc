import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { environment } from '../environments/environment';
import { News } from './pages/news/news.types';

// import { LocalStorage } from '../utils/storage/LocalStorage';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  page: number = 1;
  limit: number = 10;

  private readonly _news: BehaviorSubject<News[]> = new BehaviorSubject<News[]>([]);

  constructor(private _httpClient: HttpClient) {
  }

  get news$(): Observable<News[]> {
    return this._news.asObservable();
  }

  get(next: boolean = false): Observable<News[]> {
    return this._httpClient.get<{ news: News[] }>(`${ environment.restful }/news/${ next ? ++this.page : 1 }/${ this.limit }`)
      .pipe(
        map(x => [ ...x.news ]),
        tap((x) => {
          x.forEach(news => {
            this._news.value.push(news);
          })
          // this._news.next(x);
        }),
      );
  }

  // create(message: News): Observable<News> {
  //   return this.news$.pipe(
  //     take(1),
  //     switchMap(news => this._httpClient.post<News>('api/common/news', {message}).pipe(
  //       map((newNews) => {
  //
  //         // Update the news with the new message
  //         this._news.next([...news, newNews]);
  //
  //         // Return the new message from observable
  //         return newNews;
  //       }),
  //     )),
  //   );
  // }
  //
  // update(id: string, message: News): Observable<News> {
  //   return this.news$.pipe(
  //     take(1),
  //     switchMap(news => this._httpClient.patch<News>('api/common/news', {
  //       id,
  //       message,
  //     }).pipe(
  //       map((updatedNews: News) => {
  //
  //         // Find the index of the updated message
  //         const index = news.findIndex(item => item.id === id);
  //
  //         // Update the message
  //         news[index] = updatedNews;
  //
  //         // Update the news
  //         this._news.next(news);
  //
  //         // Return the updated message
  //         return updatedNews;
  //       }),
  //     )),
  //   );
  // }
  //
  // delete(id: string): Observable<boolean> {
  //   return this.news$.pipe(
  //     take(1),
  //     switchMap(news => this._httpClient.delete<boolean>('api/common/news', {params: {id}}).pipe(
  //       map((isDeleted: boolean) => {
  //
  //         // Find the index of the deleted message
  //         const index = news.findIndex(item => item.id === id);
  //
  //         // Delete the message
  //         news.splice(index, 1);
  //
  //         // Update the news
  //         this._news.next(news);
  //
  //         // Return the deleted status
  //         return isDeleted;
  //       }),
  //     )),
  //   );
  // }
}

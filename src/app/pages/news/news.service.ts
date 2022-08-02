import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, of, tap } from 'rxjs';
import { News } from './news.types';
import { cloneDeep } from 'lodash-es';
import { environment } from '../../../environments/environment';
import { LocalStorage } from '../../utils/storage/LocalStorage';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  @LocalStorage() tmpNews: News[] = [];

  page: number = 1;
  limit: number = 10;

  private _newsItem: BehaviorSubject<News | null> = new BehaviorSubject(null);
  private _news: BehaviorSubject<News[] | null> = new BehaviorSubject(null);

  constructor(private _httpClient: HttpClient) {
  }

  get news$(): Observable<News[]> {
    return this._news.asObservable();
  }

  get newsItem$(): Observable<News> {
    return this._newsItem.asObservable();
  }

  getNews(next: boolean = false): Observable<News[]> {
    return this._httpClient.get<{ news: News[] }>(
      `${ environment.restful }/news/${ next ? ++this.page : 1 }/${ this.limit }`,
    ).pipe(
      map(response => response.news),
      tap((response) => {
        this._news.next(response);
      }),
    );
  }

  getNewsBySlug(slug: string): Observable<News> {
    return this._httpClient.get<News>(
      `${ environment.restful }/news/item/${ slug }`,
    ).pipe(
      tap((response) => {
        this._newsItem.next(response);
      }),
    );
  }

  createNews(newsItem: News): Observable<News> {
    newsItem.id = Math.random() * 100000 | 0;

    if (!this.tmpNews || this.tmpNews.length === 0) {
      this.tmpNews = [ newsItem ]
    } else {
      this.tmpNews.push(newsItem)
    }

    return of(newsItem);
  }

  updateNews(newsItem: News): Observable<News> {
    const updatedNews = cloneDeep(newsItem) as any;
    return this._httpClient.patch<News>('api/apps/notes', { updatedNews }).pipe(
      tap((response) => {

        this.getNews().subscribe();
      }),
    );
  }

  deleteNews(newsItem: News): Observable<boolean> {
    return this._httpClient.delete<boolean>('api/apps/notes', { params: { id: newsItem.id } }).pipe(
      map((isDeleted: boolean) => {

        this.getNews().subscribe();

        return isDeleted;
      }),
    );
  }
}

import { Component } from '@angular/core';

// RxJS v6+
import { interval, Observable, timer } from 'rxjs';
import { NewsService } from '../../services/news.service';
import { News } from '../../types';
import { debounce } from 'rxjs/operators';

@Component({
  templateUrl: './layout.html',
  selector: 'list',
})
export class ListComponent {
  constructor(
    private readonly _service: NewsService,
  ) {
    const interval$ = interval(1000);

    const debouncedInterval = interval$.pipe(debounce(val => timer(val * 200)));

    const subscribe = debouncedInterval.subscribe(val =>
      console.log(`Example Two: ${ val }`),
    );
  }

  get news$(): Observable<News[]> {
    return this._service.news$;
  }

  next(): Observable<News[]> {
    return this._service.get(true);
  }
}

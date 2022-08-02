import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, combineLatest, distinctUntilChanged, map, Observable, Subject, takeUntil } from 'rxjs';
import { NewsDetailsComponent } from '../details/details.component';
import { cloneDeep } from 'lodash-es';
import { MediaWatcher } from '../../../core/media/service';
import { News } from '../news.types';
import { NewsService } from '../news.service';

@Component({
  selector: 'news-list',
  templateUrl: './list.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsListComponent implements OnInit, OnDestroy {
  news$: Observable<News[]>;

  filter$: BehaviorSubject<string> = new BehaviorSubject('news');
  searchQuery$: BehaviorSubject<string> = new BehaviorSubject(null);
  masonryColumns: number = 4;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _mediaWatcher: MediaWatcher,
    private _matDialog: MatDialog,
    private _newsService: NewsService,
  ) {
  }

  get filterStatus(): string {
    return this.filter$.value;
  }

  ngOnInit(): void {
    this._newsService.getNews().subscribe();

    this.news$ = combineLatest([ this._newsService.news$, this.filter$, this.searchQuery$ ]).pipe(
      distinctUntilChanged(),
      map(([ news, filter, searchQuery ]) => {
        if (!news || !news.length) {
          // @ts-ignore
          return;
        }

        let filteredNews = news;

        if (searchQuery) {
          searchQuery = searchQuery.trim().toLowerCase();
          filteredNews = filteredNews.filter(
            news =>
              news.title.toLowerCase().includes(searchQuery) ||
              news.text?.toLowerCase().includes(searchQuery),
          );
        }

        if (filter === 'news') {
          // do
        }

        return filteredNews;
      }),
    );

    this._mediaWatcher.onMediaChange$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(({ matchingAliases }) => {

        if (matchingAliases.includes('xl')) {
          this.masonryColumns = 5;
        } else if (matchingAliases.includes('lg')) {
          this.masonryColumns = 4;
        } else if (matchingAliases.includes('md')) {
          this.masonryColumns = 3;
        } else if (matchingAliases.includes('sm')) {
          this.masonryColumns = 2;
        } else {
          this.masonryColumns = 1;
        }
        this._changeDetectorRef.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  addNewNews(): void {
    this._matDialog.open(NewsDetailsComponent, {
      autoFocus: false,
      data: {
        newsItem: {},
      },
    });
  }

  openNewsItemDialog(newsItem: News): void {
    this._matDialog.open(NewsDetailsComponent, {
      autoFocus: false,
      data: {
        newsItem: cloneDeep(newsItem),
      },
    });
  }


  filterByQuery(query: string): void {
    this.searchQuery$.next(query);
  }

  resetFilter(): void {
    this.filter$.next('news');
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }
}

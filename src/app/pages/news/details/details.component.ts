import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { debounceTime, map, Observable, of, Subject, switchMap, takeUntil } from 'rxjs';
import { News } from '../news.types';
import { NewsService } from '../news.service';

@Component({
  selector: 'news-details',
  templateUrl: './details.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsDetailsComponent implements OnInit, OnDestroy {
  newsItem$: Observable<News>;

  newsItemChanged: Subject<News> = new Subject<News>();

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) private _data: { newsItem: News },
    private _newsService: NewsService,
    private _matDialogRef: MatDialogRef<NewsDetailsComponent>,
  ) {
  }

  ngOnInit(): void {
    if (this._data.newsItem.url) {
      this._newsService.getNewsBySlug(this._data.newsItem.url).subscribe();

      this.newsItem$ = this._newsService.newsItem$;
    } else {
      const newsItem: News = {
        id: null,
        title: '',
        text: '',
        titleImageUrl: null,
        url: '',
        categoryType: '',
        fullUrl: '',
        description: '',
        publishedDate: new Date(),
      };

      this.newsItem$ = of(newsItem);
    }

    this.newsItemChanged
      .pipe(
        takeUntil(this._unsubscribeAll),
        debounceTime(500),
        switchMap(newsItem => this._newsService.updateNews(newsItem)))
      .subscribe(() => {
        this._changeDetectorRef.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  createNews(newsItem: News): void {
    this._newsService.createNews(newsItem).pipe(
      map(() => {
        this.newsItem$ = this._newsService.newsItem$;
      })).subscribe();
  }

  uploadImage(newsItem: News, fileList: FileList): void {
    if (!fileList.length) {
      return;
    }

    const allowedTypes = [ 'image/jpeg', 'image/png' ];
    const file = fileList[0];

    if (!allowedTypes.includes(file.type)) {
      return;
    }

    this._readAsDataURL(file).then((data) => {
      newsItem.titleImageUrl = data;

      this.newsItemChanged.next(newsItem);
    });
  }

  removeImage(newsItem: News): void {
    newsItem.titleImageUrl = null;

    this.newsItemChanged.next(newsItem);
  }

  updateNewsDetails(newsItem: News): void {
    this.newsItemChanged.next(newsItem);
  }

  deleteNews(newsItem: News): void {
    this._newsService.deleteNews(newsItem)
      .subscribe((isDeleted) => {

        if (!isDeleted) {
          return;
        }

        this._matDialogRef.close();
      });
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  private _readAsDataURL(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (): void => {
        resolve(reader.result);
      };

      reader.onerror = (e): void => {
        reject(e);
      };

      reader.readAsDataURL(file);
    });
  }
}

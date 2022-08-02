import { AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, Output, ViewChild } from '@angular/core';
import { distinctUntilChanged, filter, map, mergeMap, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'observer',
  template: `
    <div #ref
         class="observer"></div>
  `,
})
export class Observer implements AfterViewInit, OnDestroy {
  @ViewChild('ref', { read: ElementRef }) ref: ElementRef<HTMLElement> | undefined;

  @Output('intersect') emit: EventEmitter<string>;

  observer: Subscription | undefined;

  constructor() {
    this.emit = new EventEmitter();
  }

  create(element: ElementRef): Observable<boolean> {
    return new Observable(observer => {
      const intersectionObserver = new IntersectionObserver(entries => {
        observer.next(entries);
      });

      intersectionObserver.observe(element.nativeElement);

      return () => {
        intersectionObserver.disconnect();
      };
    }).pipe(
      // @ts-ignore
      mergeMap((entries: IntersectionObserverEntry[]) => entries),
      map(entry => entry.isIntersecting),
      distinctUntilChanged(),
    );
  }

  ngAfterViewInit(): void {
    this.observer = this.create(this.ref!).pipe(
      filter((isVisible: boolean) => isVisible),
    ).subscribe(x => {
      this.emit.next('intersect');
    });
  }

  ngOnDestroy(): void {
    this.observer?.unsubscribe();
  }
}

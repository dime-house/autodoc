import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { Animations } from '../animate';

@Component({
  selector: 'masonry',
  template: `
    <div class="flex">
      <ng-container *ngTemplateOutlet="columnsTemplate; context: { $implicit: distributedColumns }"></ng-container>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  animations: Animations,
  exportAs: 'Masonry',
})
export class MasonryComponent implements OnChanges, AfterViewInit {
  @Input() columnsTemplate: TemplateRef<any> | undefined;
  @Input() columns: number | undefined;
  @Input() items: any[] = [];

  distributedColumns: any[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if ('columns' in changes) {
      this._distributeItems();
    }

    if ('items' in changes) {
      this._distributeItems();
    }
  }

  ngAfterViewInit(): void {
    this._distributeItems();
  }

  private _distributeItems(): void {
    if (this.items.length === 0) {
      this.distributedColumns = [];
      return;
    }

    this.distributedColumns = Array.from(Array(this.columns), item => ({ items: [] }));

    for (let i = 0; i < this.items.length; i++) {
      this.distributedColumns[i % this.columns!].items.push(this.items[i]);
    }
  }
}

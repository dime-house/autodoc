import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasonryComponent } from './component';

@NgModule({
  declarations: [
    MasonryComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    MasonryComponent,
  ],
})
export class MasonryModule {
}

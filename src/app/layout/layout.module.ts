import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { EmptyLayoutModule } from './layouts/empty/empty.module';
import { LayoutComponent } from './layout.component';

const layoutModules = [
  EmptyLayoutModule,

];

@NgModule({
  declarations: [
    LayoutComponent,
  ],
  imports: [
    SharedModule,
    ...layoutModules,
  ],
  exports: [
    LayoutComponent,
    ...layoutModules,
  ],
})
export class LayoutModule {
}

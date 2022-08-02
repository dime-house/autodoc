import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { Observer } from './component';

@NgModule({
  declarations: [
    Observer,
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    Observer,
  ],
})
export class ObserverModule {
}

import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ListComponent } from './component';
import { ObserverModule } from '../observer';
import { CardModule } from '../card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [
    ListComponent,
  ],
  imports: [
    SharedModule,
    ObserverModule,
    CardModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
  ],
  exports: [
    ListComponent,
  ],
})
export class ListModule {
}

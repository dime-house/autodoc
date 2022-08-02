import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatRippleModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NewsComponent } from './news.component';
import { newsRoutes } from './news.routing';
import { SharedModule } from '../../shared/shared.module';
import { MasonryModule } from '../../core/masonry';
import { NewsDetailsComponent } from './details/details.component';
import { NewsListComponent } from './list/list.component';

@NgModule({
  declarations: [
    NewsComponent,
    NewsDetailsComponent,
    NewsListComponent,
  ],
  imports: [
    RouterModule.forChild(newsRoutes),
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatRippleModule,
    MatSidenavModule,
    MasonryModule,
    SharedModule,
  ],
})
export class NewsModule {
}

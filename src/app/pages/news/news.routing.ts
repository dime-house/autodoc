import { Route } from '@angular/router';
import { NewsComponent } from './news.component';
import { NewsListComponent } from './list/list.component';

export const newsRoutes: Route[] = [
  {
    path: '',
    component: NewsComponent,
    children: [
      {
        path: '',
        component: NewsListComponent,
      },
    ],
  },
];

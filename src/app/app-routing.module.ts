import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { InitialDataResolver } from './app.resolver';
import { LayoutComponent } from './layout/layout.component';


const routes = [
  {
    path: '',
    component: LayoutComponent,
    resolve: {
      initialData: InitialDataResolver,
    },
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/news/news.module').then(x => x.NewsModule),
      },
    ],
  },
];


@NgModule({
  imports: [ RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled',
  }) ],
  exports: [ RouterModule ],
})
export class AppRoutingModule {
}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { FuseMockApiModule } from './mock/mock-api-module';
import { NotesMockApi } from './mock/mock-api-module/apps/notes/api';
import { appConfig } from './app.config';
import { LayoutModule } from './layout/layout.module';
import { ConfigModule } from './core/config';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FuseMockApiModule.forRoot([
      NotesMockApi,
    ]),
    ConfigModule.forRoot(appConfig),
    AppRoutingModule,
    LayoutModule,
    CoreModule,
  ],
  providers: [],
  bootstrap: [ AppComponent ],
})
export class AppModule {
}

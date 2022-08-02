import { NgModule } from '@angular/core';
import { MediaWatcher } from './service';

@NgModule({
  providers: [
    MediaWatcher,
  ],
})
export class MediaWatcherModule {
  constructor(private _mediaWatcher: MediaWatcher) {
  }
}

import { HttpClientModule } from '@angular/common/http';
import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { ConfigService } from './config.service';
import { MediaWatcherModule } from '../media';

export const APP_CONFIG = new InjectionToken<any>('APP_CONFIG');

@NgModule({
  imports: [ HttpClientModule, MediaWatcherModule ],
})
export class ConfigModule {
  constructor(private _configService: ConfigService) {
  }

  static forRoot(config: any): ModuleWithProviders<ConfigModule> {
    return {
      ngModule: ConfigModule,
      providers: [
        {
          provide: APP_CONFIG,
          useValue: config,
        },
      ],
    };
  }
}

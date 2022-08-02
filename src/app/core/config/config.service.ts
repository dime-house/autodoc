import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { merge } from 'lodash-es';
import { APP_CONFIG } from './index';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  constructor(@Inject(APP_CONFIG) config: any) {
    this._config = new BehaviorSubject(config);
  }

  private _config: BehaviorSubject<any>;

  set config(value: any) {
    const config = merge({}, this._config.getValue(), value);

    this._config.next(config);
  }

  get config$(): Observable<any> {
    return this._config.asObservable();
  }

  reset(): void {
    this._config.next(this.config);
  }
}

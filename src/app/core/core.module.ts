import { NgModule, Optional, SkipSelf } from '@angular/core';
import { IconsModule } from './icons/icons.module';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

@NgModule({
  imports: [
    IconsModule,
  ],
  providers: [
    {
      provide: MATERIAL_SANITY_CHECKS,
      useValue: {
        doctype: true,
        theme: false,
        version: true,
      },
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'fill',
      },
    },
  ],
})
export class CoreModule {
  constructor(
    @Optional() @SkipSelf() parentModule?: CoreModule,
  ) {
    if (parentModule) {
      throw new Error('CoreModule has already been loaded');
    }
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UidDemoComponent } from './demo/demo.component';
import { HIGHLIGHT_OPTIONS, HighlightModule } from 'ngx-highlightjs';
import { PortalModule } from '@angular/cdk/portal';


@NgModule({
  declarations: [
    UidDemoComponent
  ],
  exports: [
    UidDemoComponent
  ],
  imports: [
    CommonModule,
    HighlightModule,
    PortalModule
  ],
  providers: [
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        languages: {
          xml: () => import('highlight.js/lib/languages/xml'),
          css: () => import('highlight.js/lib/languages/css'),
          typescript: () => import('highlight.js/lib/languages/typescript')
        }
      }
    }
  ],
})
export class UidSharedModule {}

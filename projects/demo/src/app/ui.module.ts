import { NgModule } from '@angular/core';
import { DialogModule, PaginatorModule, TooltipModule } from '@koolm/ngx-ui-components';


@NgModule({
  imports: [
    DialogModule,
    TooltipModule,
    PaginatorModule
  ],
  exports: [
    DialogModule,
    TooltipModule,
    PaginatorModule
  ]
})
export class UiModule {}

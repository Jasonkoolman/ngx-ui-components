import { NgModule } from '@angular/core';
import { PaginatorModule } from '@koolm/ngx-ui-components';
import { UidPaginatorTemplates } from './paginator-templates';


@NgModule({
  declarations: [
    UidPaginatorTemplates
  ],
  imports: [
    PaginatorModule
  ]
})
export class UidPaginatorTemplatesModule {}

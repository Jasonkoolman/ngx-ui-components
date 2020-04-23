import { NgModule } from '@angular/core';
import { PaginatorModule } from '@koolm/ngx-ui-components';
import { UidPaginatorConfiguration } from './paginator-configuration';


@NgModule({
  declarations: [
    UidPaginatorConfiguration
  ],
  imports: [
    PaginatorModule
  ]
})
export class UidPaginatorConfigurationModule {}

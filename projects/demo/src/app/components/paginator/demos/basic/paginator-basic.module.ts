import { NgModule } from "@angular/core";
import { PaginatorModule } from "@koolm/ngx-ui-components";
import { UidPaginatorBasic } from "./paginator-basic";


@NgModule({
  declarations: [
    UidPaginatorBasic
  ],
  imports: [
    PaginatorModule
  ]
})
export class UidPaginatorBasicModule {}

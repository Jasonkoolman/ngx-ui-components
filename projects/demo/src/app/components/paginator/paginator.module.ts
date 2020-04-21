import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UidSharedModule } from "../../shared/shared.module";
import { UidPaginatorComponent } from "./paginator.component";
import { UidPaginatorBasicModule } from "./demos/basic/paginator-basic.module";


@NgModule({
  declarations: [
    UidPaginatorComponent
  ],
  imports: [
    CommonModule,
    UidSharedModule,
    UidPaginatorBasicModule
  ]
})
export class PaginatorDemoModule { }

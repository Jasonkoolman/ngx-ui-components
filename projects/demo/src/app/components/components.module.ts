import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogDemoModule } from "./dialog/dialog.module";
import { TooltipDemoModule } from "./tooltip/tooltip.module";
import { UidSharedModule } from "../shared/shared.module";
import { PaginatorDemoModule } from "./paginator/paginator.module";


@NgModule({
  imports: [
    CommonModule,
    UidSharedModule,
    DialogDemoModule,
    TooltipDemoModule,
    PaginatorDemoModule
  ],
})
export class UidComponentsModule {}

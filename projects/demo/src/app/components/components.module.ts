import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogDemoModule } from "./dialog/dialog.module";
import { TooltipDemoModule } from "./tooltip/tooltip.module";
import { UidSharedModule } from "../shared/shared.module";
import { PaginatorDemoModule } from "./paginator/paginator.module";
import { RouterModule } from "@angular/router";
import { routes } from "./components-routes";
import { UidComponentsComponent } from "./components.component";
import { UidComponentService } from "./component.service";
import { UidComponentResolver } from "./component-resolver";

const MODULES = [
  DialogDemoModule,
  TooltipDemoModule,
  PaginatorDemoModule
]


@NgModule({
  declarations: [
    UidComponentsComponent
  ],
  providers: [
    UidComponentService,
    UidComponentResolver
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    UidSharedModule,
    ...MODULES
  ]
})
export class UidComponentsModule {}

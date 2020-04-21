import { NgModule } from "@angular/core";
import { TooltipModule } from "ngx-ui-components";
import { UidTooltipBasic } from "./tooltip-basic";


@NgModule({
  declarations: [
    UidTooltipBasic,
  ],
  imports: [
    TooltipModule
  ]
})
export class UidTooltipBasicModule {}

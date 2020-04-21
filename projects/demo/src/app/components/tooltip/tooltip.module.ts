import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UidTooltipComponent } from './tooltip.component';
import { UidSharedModule } from "../../shared/shared.module";
import { UidTooltipBasicModule } from "./demos/basic/tooltip-basic.module";



@NgModule({
  declarations: [
    UidTooltipComponent
  ],
  imports: [
    CommonModule,
    UidSharedModule,
    UidTooltipBasicModule
  ]
})
export class TooltipDemoModule { }

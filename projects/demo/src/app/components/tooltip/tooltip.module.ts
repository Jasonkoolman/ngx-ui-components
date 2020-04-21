import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UidSharedModule } from "../../shared/shared.module";
import { UidTooltipBasicModule } from "./demos/basic/tooltip-basic.module";
import { UidComponentService } from "../component.service";
import { UidTooltipBasic } from "./demos/basic/tooltip-basic";

const DEMOS = [
  {
    id: 'basic',
    title: 'Basic tooltip',
    component: UidTooltipBasic,
    description: null,
    files: [
      {
        name: 'basic-tooltip.html',
        label: 'HTML',
        source: require('!!raw-loader!./demos/basic/tooltip-basic.html').default
      },
      {
        name: 'basic-dialog.ts',
        label: 'TS',
        source: require('!!raw-loader!./demos/basic/tooltip-basic.ts').default
      }
    ]
  }
];


@NgModule({
  imports: [
    CommonModule,
    UidSharedModule,
    UidTooltipBasicModule
  ]
})
export class TooltipDemoModule {

  constructor(private componentService: UidComponentService) {
    this.componentService.addComponent('tooltip', {
      name: 'Tooltip',
      demos: DEMOS,
    });
  }

}

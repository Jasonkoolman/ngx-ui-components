import { NgModule } from '@angular/core';
import { TooltipModule } from '@koolm/ngx-ui-components';
import { UidTooltipDelay } from './tooltip-delay';


@NgModule({
  declarations: [
    UidTooltipDelay,
  ],
  imports: [
    TooltipModule
  ]
})
export class UidTooltipDelayModule {}

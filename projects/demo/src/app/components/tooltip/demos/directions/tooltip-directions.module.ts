import { NgModule } from '@angular/core';
import { TooltipModule } from '@koolm/ngx-ui-components';
import { UidTooltipDirections } from './tooltip-directions';


@NgModule({
  declarations: [
    UidTooltipDirections,
  ],
  imports: [
    TooltipModule
  ]
})
export class UidTooltipDirectionsModule {}

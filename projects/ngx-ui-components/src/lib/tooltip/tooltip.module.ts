import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';

import { TooltipContainerComponent } from './tooltip-container.component';
import { TooltipDirective } from './tooltip.directive';


@NgModule({
  declarations: [
    TooltipContainerComponent,
    TooltipDirective
  ],
  exports: [
    TooltipDirective
  ],
  imports: [
    CommonModule,
    OverlayModule,
    PortalModule
  ]
})
export class TooltipModule {}

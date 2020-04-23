import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';

import { DialogContainerComponent } from './dialog-container.component';
import { DialogService } from './dialog.service';
import {
  DialogCloseDirective,
  DialogContentDirective,
  DialogFooterDirective,
  DialogTitleDirective
} from './dialog-directives';


@NgModule({
  declarations: [
    DialogContainerComponent,
    DialogTitleDirective,
    DialogContentDirective,
    DialogFooterDirective,
    DialogCloseDirective
  ],
  providers: [
    DialogService
  ],
  exports: [
    DialogContainerComponent,
    DialogTitleDirective,
    DialogContentDirective,
    DialogFooterDirective,
    DialogCloseDirective
  ],
  imports: [
    CommonModule,
    OverlayModule,
    PortalModule
  ]
})
export class DialogModule {}

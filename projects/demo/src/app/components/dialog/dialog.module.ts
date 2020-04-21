import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UidDialogBasicModule } from "./demos/basic/dialog-basic.module";
import { UidSharedModule } from "../../shared/shared.module";
import { UidDialogCustomAnimationsModule } from "./demos/custom-animations/dialog-custom-animations.module";
import { UidDialogComponent } from "./dialog.component";


@NgModule({
  declarations: [
    UidDialogComponent
  ],
  imports: [
    CommonModule,
    UidSharedModule,
    UidDialogBasicModule,
    UidDialogCustomAnimationsModule,
  ]
})
export class DialogDemoModule {}

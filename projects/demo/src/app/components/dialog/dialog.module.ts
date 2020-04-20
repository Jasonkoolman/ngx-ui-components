import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UidDialogBasicModule } from "./demos/basic/dialog-basic.module";
import { UidDialogComponent } from "./dialog.component";
import { UidSharedModule } from "../../shared/shared.module";


@NgModule({
  declarations: [
    UidDialogComponent
  ],
  imports: [
    CommonModule,
    UidSharedModule,
    UidDialogBasicModule
  ]
})
export class DialogDemoModule {}

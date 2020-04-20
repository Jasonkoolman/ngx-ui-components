import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DialogDemoModule } from "./dialog/dialog.module";


@NgModule({
  imports: [
    CommonModule,
    DialogDemoModule
  ]
})
export class UidComponentsModule {}

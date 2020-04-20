import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from "../ui.module";

import { DialogDemoModule } from "./dialog/dialog.module";


@NgModule({
  imports: [
    CommonModule,
    UiModule,
    DialogDemoModule
  ]
})
export class UidComponentsModule {}

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UidBasicDialog, UidBasicComponent } from "./dialog-basic";


@NgModule({
  declarations: [
    UidBasicDialog,
    UidBasicComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class UidDialogBasicModule {}

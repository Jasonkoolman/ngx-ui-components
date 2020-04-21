import { NgModule } from "@angular/core";
import { DialogModule } from "@koolm/ngx-ui-components";
import { UidBasicDialog, UidBasicComponent } from "./dialog-basic";


@NgModule({
  declarations: [
    UidBasicDialog,
    UidBasicComponent,
  ],
  imports: [
    DialogModule
  ]
})
export class UidDialogBasicModule {}

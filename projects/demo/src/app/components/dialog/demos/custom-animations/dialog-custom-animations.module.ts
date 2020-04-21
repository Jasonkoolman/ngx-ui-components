import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UidCustomAnimationComponent, UidCustomAnimationDialog } from "./dialog-custom-animations";
import { DialogModule } from "ngx-ui-components";


@NgModule({
  declarations: [
    UidCustomAnimationDialog,
    UidCustomAnimationComponent,
  ],
  imports: [
    CommonModule,
    DialogModule
  ]
})
export class UidDialogCustomAnimationsModule {}

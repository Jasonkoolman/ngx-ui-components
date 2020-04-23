import { NgModule } from '@angular/core';
import { DialogModule } from '@koolm/ngx-ui-components';
import { UidCustomAnimationComponent, UidCustomAnimationDialog } from './dialog-custom-animations';


@NgModule({
  declarations: [
    UidCustomAnimationDialog,
    UidCustomAnimationComponent,
  ],
  imports: [
    DialogModule
  ]
})
export class UidDialogCustomAnimationsModule {}

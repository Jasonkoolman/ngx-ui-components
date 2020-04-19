import { Component } from '@angular/core';
import { DialogConfig, DialogRef } from 'ngx-ui-components';

@Component({
  selector: 'app-confirmation-dialog',
  template: `
    <h3 ui-dialog-title>{{ data.title }}</h3>
    <ui-dialog-content>
      {{ data.body }}
    </ui-dialog-content>
    <ui-dialog-footer>
      <button ui-dialog-close>Abort</button>
      <button ui-dialog-close result="true">Proceed</button>
    </ui-dialog-footer>
  `,
})
export class ConfirmationDialogComponent {
  constructor(
    private readonly dialogConfig: DialogConfig,
    private readonly dialogRef: DialogRef,
  ) {}

  get data() {
    return this.dialogConfig.data;
  }
}

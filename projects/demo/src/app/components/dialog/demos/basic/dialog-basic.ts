import { Component } from '@angular/core';
import { DialogService } from '@koolm/ngx-ui-components';

@Component({
  selector: 'uid-basic-dialog',
  template: 'The simplest things are often the truest.',
})
export class UidBasicDialog {}

@Component({
  selector: 'uid-basic-component',
  templateUrl: 'dialog-basic.html',
})
export class UidBasicComponent {
  constructor(private dialog: DialogService) {}

  openDialog() {
    this.dialog.open(UidBasicDialog);
  }
}

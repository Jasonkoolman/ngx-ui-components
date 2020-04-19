import { Directive, HostBinding, HostListener, Input } from '@angular/core';
import { DialogRef } from './dialog-ref';

/**
 * Title of a dialog.
 */
@Directive({
  selector: '[ui-dialog-title], [uiDialogTitle]',
})
export class DialogTitleDirective {
  @HostBinding('attr.id') @Input() id = `${this.dialogRef.id}-title`;
  @HostBinding() class = 'dialog-title';

  constructor(private dialogRef: DialogRef) {
    const container = this.dialogRef.containerInstance;

    if (container && !container.ariaLabelledBy) {
      container.ariaLabelledBy = this.id;
    }
  }
}

/**
 * Content container of a dialog.
 */
@Directive({
  selector: '[ui-dialog-content], ui-dialog-content, [uiDialogContent]',
})
export class DialogContentDirective {
  @HostBinding() class = 'dialog-content';
}

/**
 * Fixed footer of a dialog.
 */
@Directive({
  selector: '[ui-dialog-footer], ui-dialog-footer, [uiDialogFooter]',
})
export class DialogFooterDirective {
  @HostBinding() class = 'dialog-footer';
}

/**
 * Button to close a dialog.
 */
@Directive({
  selector: '[ui-dialog-close], [uiDialogClose]',
  exportAs: 'uiDialogClose'
})
export class DialogCloseDirective {
  @HostBinding('attr.type') @Input() type = 'button';
  @Input() result: any;

  constructor(private dialogRef: DialogRef) {}

  @HostListener('click') onClick() {
    this.dialogRef.close(this.result);
  }
}

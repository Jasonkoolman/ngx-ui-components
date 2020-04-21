import { Component, ViewEncapsulation } from '@angular/core';
import { DialogService } from '@koolm/ngx-ui-components';

@Component({
  selector: 'uid-animated-dialog',
  template: `
    <h3 ui-dialog-title>
      Animated dialog
    </h3>
    <ui-dialog-content>
      How do you like me now?
    </ui-dialog-content>
    <ui-dialog-footer>
      <button ui-dialog-close>Close</button>
    </ui-dialog-footer>
  `,
})
export class UidCustomAnimationDialog {}

@Component({
  selector: 'uid-animated-component',
  templateUrl: './dialog-custom-animations.html',
  styleUrls: ['./dialog-custom-animations.css'],
  encapsulation: ViewEncapsulation.None
})
export class UidCustomAnimationComponent {
  constructor(private dialog: DialogService) {}

  openDialog() {
    this.dialog.open(UidCustomAnimationDialog, {
      useCssAnimations: true
    });
  }
}

import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UidBasicComponent } from "./demos/basic/dialog-basic";


@Component({
  selector: 'uid-dialog-demo',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UidDialogComponent {
  demos = [
    {
      id: 'dialog-basic',
      title: 'Basic dialog',
      component: UidBasicComponent,
      description: null,
      files: [
        {
          name: 'basic-dialog.html',
          source: require('!!raw-loader!./demos/basic/dialog-basic.html').default
        },
        {
          name: 'basic-dialog.ts',
          source: require('!!raw-loader!./demos/basic/dialog-basic.ts').default
        }
      ]
    }
  ];
}

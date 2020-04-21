import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UidBasicComponent } from "./demos/basic/dialog-basic";
import { UidCustomAnimationComponent } from "./demos/custom-animations/dialog-custom-animations";


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
      id: 'basic',
      title: 'Basic dialog',
      component: UidBasicComponent,
      description: null,
      files: [
        {
          name: 'basic-dialog.html',
          label: 'HTML',
          source: require('!!raw-loader!./demos/basic/dialog-basic.html').default
        },
        {
          name: 'basic-dialog.ts',
          label: 'TS',
          source: require('!!raw-loader!./demos/basic/dialog-basic.ts').default
        }
      ]
    },
    {
      id: 'configuration',
      title: 'Configuring the dialog',
      component: UidBasicComponent,
      description: null,
      files: [
        {
          name: 'basic-dialog.html',
          label: 'HTML',
          source: require('!!raw-loader!./demos/basic/dialog-basic.html').default
        },
        {
          name: 'basic-dialog.ts',
          label: 'TS',
          source: require('!!raw-loader!./demos/basic/dialog-basic.ts').default
        }
      ]
    },
    {
      id: 'custom-animations',
      title: 'Using custom animations',
      component: UidCustomAnimationComponent,
      description: null,
      files: [
        {
          name: 'animated-dialog.html',
          label: 'HTML',
          source: require('!!raw-loader!./demos/custom-animations/dialog-custom-animations.html').default
        },
        {
          name: 'animated-dialog.ts',
          label: 'TS',
          source: require('!!raw-loader!./demos/custom-animations/dialog-custom-animations.ts').default
        },
        {
          name: 'animated-dialog.css',
          label: 'CSS',
          source: require('!!raw-loader!./demos/custom-animations/dialog-custom-animations.css').default
        }
      ]
    }
  ];
}

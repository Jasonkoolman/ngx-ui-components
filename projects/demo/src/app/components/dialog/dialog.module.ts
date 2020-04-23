import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UidDialogBasicModule } from './demos/basic/dialog-basic.module';
import { UidDialogCustomAnimationsModule } from './demos/custom-animations/dialog-custom-animations.module';
import { UidSharedModule } from '../../shared/shared.module';
import { UidBasicComponent } from './demos/basic/dialog-basic';
import { UidCustomAnimationComponent } from './demos/custom-animations/dialog-custom-animations';
import { UidComponentService } from '../component.service';

const DEMOS = [
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


@NgModule({
  imports: [
    CommonModule,
    UidSharedModule,
    UidDialogBasicModule,
    UidDialogCustomAnimationsModule,
  ]
})
export class DialogDemoModule {

  constructor(private componentService: UidComponentService) {
    this.componentService.addComponent('dialog', {
      name: 'Dialog',
      demos: DEMOS,
    });
  }

}

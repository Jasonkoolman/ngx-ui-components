import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UidSharedModule } from '../../shared/shared.module';
import { UidComponentService } from '../component.service';
import { UidTooltipBasic } from './demos/basic/tooltip-basic';
import { UidTooltipBasicModule } from './demos/basic/tooltip-basic.module';
import { UidTooltipDirections } from './demos/directions/tooltip-directions';
import { UidTooltipDirectionsModule } from './demos/directions/tooltip-directions.module';
import { UidTooltipDelay } from './demos/delay/tooltip-delay';
import { UidTooltipDelayModule } from './demos/delay/tooltip-delay.module';

const DEMOS = [
  {
    id: 'basic',
    title: 'Basic tooltip',
    component: UidTooltipBasic,
    description: null,
    files: [
      {
        name: 'tooltip-basic.html',
        label: 'HTML',
        source: require('!!raw-loader!./demos/basic/tooltip-basic.html').default
      },
      {
        name: 'tooltip-basic.ts',
        label: 'TS',
        source: require('!!raw-loader!./demos/basic/tooltip-basic.ts').default
      }
    ]
  },
  {
    id: 'directions',
    title: 'Different directions',
    component: UidTooltipDirections,
    description: null,
    files: [
      {
        name: 'tooltip-directions.html',
        label: 'HTML',
        source: require('!!raw-loader!./demos/directions/tooltip-directions.html').default
      },
      {
        name: 'tooltip-directions.ts',
        label: 'TS',
        source: require('!!raw-loader!./demos/directions/tooltip-directions.ts').default
      }
    ]
  },
  {
    id: 'delay',
    title: 'Using a delay',
    component: UidTooltipDelay,
    description: null,
    files: [
      {
        name: 'tooltip-delay.html',
        label: 'HTML',
        source: require('!!raw-loader!./demos/delay/tooltip-delay.html').default
      },
      {
        name: 'tooltip-delay.ts',
        label: 'TS',
        source: require('!!raw-loader!./demos/delay/tooltip-delay.ts').default
      }
    ]
  }
];


@NgModule({
  imports: [
    CommonModule,
    UidSharedModule,
    UidTooltipBasicModule,
    UidTooltipDirectionsModule,
    UidTooltipDelayModule
  ]
})
export class UidTooltipModule {

  constructor(private componentService: UidComponentService) {
    this.componentService.addComponent('tooltip', {
      name: 'Tooltip',
      demos: DEMOS,
    });
  }

}

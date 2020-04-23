import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UidSharedModule } from '../../shared/shared.module';
import { UidPaginatorBasicModule } from './demos/basic/paginator-basic.module';
import { UidPaginatorConfigurationModule } from './demos/configuration/paginator-configuration.module';
import { UidPaginatorBasic } from './demos/basic/paginator-basic';
import { UidPaginatorConfiguration } from './demos/configuration/paginator-configuration';
import { UidComponentService } from '../component.service';

const DEMOS = [
  {
    id: 'basic',
    title: 'Basic paginator',
    component: UidPaginatorBasic,
    description: 'Looks liek a charm',
    files: [
      {
        name: 'basic-paginator.html',
        label: 'HTML',
        source: require('!!raw-loader!./demos/basic/paginator-basic.html').default
      },
      {
        name: 'basic-dialog.ts',
        label: 'TS',
        source: require('!!raw-loader!./demos/basic/paginator-basic.ts').default
      }
    ]
  },
  {
    id: 'configuration',
    title: 'Configuring the paginator',
    component: UidPaginatorConfiguration,
    description: 'teasdsds',
    files: [
      {
        name: 'configuration-paginator.html',
        label: 'HTML',
        source: require('!!raw-loader!./demos/configuration/paginator-configuration.html').default
      },
      {
        name: 'configuration-dialog.ts',
        label: 'TS',
        source: require('!!raw-loader!./demos/configuration/paginator-configuration.ts').default
      }
    ]
  }
]


@NgModule({
  imports: [
    CommonModule,
    UidSharedModule,
    UidPaginatorBasicModule,
    UidPaginatorConfigurationModule
  ]
})
export class PaginatorDemoModule {

  constructor(private componentService: UidComponentService) {
    this.componentService.addComponent('paginator', {
      name: 'Paginator',
      demos: DEMOS,
    });
  }

}

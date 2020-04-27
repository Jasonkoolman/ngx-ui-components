import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UidSharedModule } from '../../shared/shared.module';
import { UidPaginatorBasicModule } from './demos/basic/paginator-basic.module';
import { UidPaginatorConfigurationModule } from './demos/configuration/paginator-configuration.module';
import { UidPaginatorTemplatesModule } from './demos/templates/paginator-templates.module';
import { UidPaginatorBasic } from './demos/basic/paginator-basic';
import { UidPaginatorConfiguration } from './demos/configuration/paginator-configuration';
import { UidPaginatorTemplates } from './demos/templates/paginator-templates';
import { UidComponentService } from '../component.service';
import { UidComponentDemo, UidComponentDocItem } from '../component.interface';

const DEMOS: UidComponentDemo[] = [
  {
    id: 'basic',
    title: 'Basic paginator',
    component: UidPaginatorBasic,
    files: [
      {
        name: 'paginator-basic.html',
        label: 'HTML',
        source: require('!!raw-loader!./demos/basic/paginator-basic.html').default
      },
      {
        name: 'paginator-basic.ts',
        label: 'TS',
        source: require('!!raw-loader!./demos/basic/paginator-basic.ts').default
      }
    ]
  },
  {
    id: 'configuration',
    title: 'Configuring the paginator',
    component: UidPaginatorConfiguration,
    files: [
      {
        name: 'paginator-configuration.html',
        label: 'HTML',
        source: require('!!raw-loader!./demos/configuration/paginator-configuration.html').default
      },
      {
        name: 'paginator-configuration.ts',
        label: 'TS',
        source: require('!!raw-loader!./demos/configuration/paginator-configuration.ts').default
      }
    ]
  },
  {
    id: 'templates',
    title: 'Overriding templates',
    component: UidPaginatorTemplates,
    files: [
      {
        name: 'paginator-templates.html',
        label: 'HTML',
        source: require('!!raw-loader!./demos/templates/paginator-templates.html').default
      },
      {
        name: 'paginator-templates.ts',
        label: 'TS',
        source: require('!!raw-loader!./demos/templates/paginator-templates.ts').default
      }
    ]
  }
];

const DOCS: UidComponentDocItem[] = [
  {
    key: 'components',
    name: 'paginator.component.ts'
  }
];


@NgModule({
  imports: [
    CommonModule,
    UidSharedModule,
    UidPaginatorBasicModule,
    UidPaginatorConfigurationModule,
    UidPaginatorTemplatesModule
  ]
})
export class UidPaginatorModule {

  constructor(private componentService: UidComponentService) {
    this.componentService.addComponent('paginator', {
      name: 'Paginator',
      demos: DEMOS,
      docs: DOCS
    });
  }

}

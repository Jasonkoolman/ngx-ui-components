import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TooltipModule } from '@koolm/ngx-ui-components';

import { UidSharedModule } from '../shared/shared.module';
import { UidDialogModule } from './dialog/dialog.module';
import { UidTooltipModule } from './tooltip/tooltip.module';
import { UidPaginatorModule } from './paginator/paginator.module';

import { UidComponentsComponent } from './components.component';
import { UidComponentService } from './component.service';
import { UidComponentResolver } from './component-resolver';
import { UidComponentApi } from './views/api.component';
import { UidComponentExamples } from './views/examples.component';
import { routes } from './component-routes';


const MODULES = [
  UidDialogModule,
  UidTooltipModule,
  UidPaginatorModule
];


@NgModule({
  declarations: [
    UidComponentsComponent,
    UidComponentApi,
    UidComponentExamples
  ],
  providers: [
    UidComponentService,
    UidComponentResolver
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    UidSharedModule,
    TooltipModule,
    ...MODULES
  ]
})
export class UidComponentsModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { UidSharedModule } from '../shared/shared.module';
import { UidDialogModule } from './dialog/dialog.module';
import { UidTooltipModule } from './tooltip/tooltip.module';
import { UidPaginatorModule } from './paginator/paginator.module';

import { UidComponentsComponent } from './components.component';
import { UidComponentService } from './component.service';
import { UidComponentResolver } from './component-resolver';
import { routes } from './component-routes';

const MODULES = [
  UidDialogModule,
  UidTooltipModule,
  UidPaginatorModule
];


@NgModule({
  declarations: [
    UidComponentsComponent
  ],
  providers: [
    UidComponentService,
    UidComponentResolver
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    UidSharedModule,
    ...MODULES
  ]
})
export class UidComponentsModule {}

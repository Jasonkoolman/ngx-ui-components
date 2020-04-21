import { Routes } from '@angular/router';
import { UidDialogComponent } from "./components/dialog/dialog.component";
import { UidTooltipComponent } from "./components/tooltip/tooltip.component";
import { UidPaginatorComponent } from "./components/paginator/paginator.component";

export const routes: Routes = [
  { path: 'dialog', component: UidDialogComponent },
  { path: 'tooltip', component: UidTooltipComponent },
  { path: 'paginator', component: UidPaginatorComponent },
];

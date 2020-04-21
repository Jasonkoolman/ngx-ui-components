import { Routes } from '@angular/router';
import { UidDialogComponent } from "./dialog/dialog.component";
import { UidPaginatorComponent } from "./paginator/paginator.component";
import { UidComponentsComponent } from "./components.component";
import { UidComponentResolver } from "./component-resolver";

export const routes: Routes = [
  { path: 'dialog', component: UidDialogComponent },
  { path: 'paginator', component: UidPaginatorComponent },
  {
    path: 'components/:slug',
    resolve: { component: UidComponentResolver },
    component: UidComponentsComponent
  },
];

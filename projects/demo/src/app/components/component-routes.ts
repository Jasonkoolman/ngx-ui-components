import { Routes } from '@angular/router';
import { UidComponentsComponent } from './components.component';
import { UidComponentResolver } from './component-resolver';

export const routes: Routes = [
  {
    path: 'components/:slug',
    resolve: {component: UidComponentResolver},
    component: UidComponentsComponent
  },
];

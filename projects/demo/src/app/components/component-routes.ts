import { Routes } from '@angular/router';
import { UidComponentsComponent } from './components.component';
import { UidComponentResolver } from './component-resolver';
import { UidComponentExamples } from './views/examples.component';
import { UidComponentApi } from './views/api.component';

export const routes: Routes = [
  {
    path: 'components/:slug',
    data: {sidebar: true},
    resolve: {component: UidComponentResolver},
    component: UidComponentsComponent,
    children: [
      {path: 'examples', component: UidComponentExamples},
      {path: 'api', component: UidComponentApi},
      {path: '', pathMatch: 'full', redirectTo: 'examples'}
    ]
  },
];

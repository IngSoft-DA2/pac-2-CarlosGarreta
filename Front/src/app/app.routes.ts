import { Routes } from '@angular/router';

import { reflectionGuard } from './reflection.guard';
import { ReflectionComponent } from './reflection/reflection.component';
import { ConsignaComponent } from './shared/components/consigna/consigna.component';

export const routes: Routes = [
  { 
    path: 'reflection',
    component: ReflectionComponent,
    canActivate: [reflectionGuard]
  },
  { 
    path: '**',
    component: ConsignaComponent,
    canActivate: []
  }
];

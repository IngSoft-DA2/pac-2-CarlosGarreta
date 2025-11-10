import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CounterService } from './reflection/counter.service';

export const reflectionGuard: CanActivateFn = (route, state) => {
  const counter = inject(CounterService);
  const router = inject(Router);

  if (counter.getCount() > 20) {
    alert('acceso proihbido por tener mas de 20 accesos, redireccionando a home');
    router.navigateByUrl('/');
    return false;
  }

  return true;
};

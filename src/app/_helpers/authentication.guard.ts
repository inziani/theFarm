import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';

import { AuthenticationService } from '@app/_helpers/services/authentication.service';
// import { FinanceService } from '@app/core/services/finance.service';
import { tap } from 'rxjs';

export const authenticationGuard: CanActivateFn = () => {
  const route = inject(Router);
  return inject(AuthenticationService).isLoggedOnData$.pipe(
    tap((isLoggedIn) => {
      console.log('Guard Response-', isLoggedIn);
      !isLoggedIn && route.navigate(['login']);
    })
  );
};

export const canMatchModulesGuard: CanMatchFn = () => {
  const route = inject(Router);
  // const financeService = inject(FinanceService);
  // const errorMessage = 'unauthorized';
  return inject(AuthenticationService).isLoggedOnData$.pipe(
    tap((isLoggedIn) => {
      console.log('Guard Response-', isLoggedIn);
      !isLoggedIn && route.navigate(['login']);
      // financeService.sendData(errorMessage);
      // !isLoggedIn && route.navigate(['unauthorized']);
    })
  );
};

import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FinanceService } from '@app/_helpers/services/finance.service';
import { selectIsAuthenticated } from '@app/authentication/store/selectors/authentication.selector';
import { AuthenticationState } from '@app/authentication/store/state/authentication.state';
import { Store } from '@ngrx/store';
import { Location } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-unauthorized-serve-response',
  templateUrl: './unauthorized-serve-response.component.html',
  styleUrls: ['./unauthorized-serve-response.component.css'],
})
export class UnauthorizedServeResponseComponent {
  public navigationError!: string;
  public errorMessage!: string;
  public isAuthenticated!: boolean;

  ngOnInit() {
    // this._financeService.data.subscribe({
    //   next: (data: string) => {
    //     this.navigationError = data;
    //     console.log('NavigationError - ', this.navigationError);
    //   },
    //   error: (err) => (this.errorMessage = err),
    //   complete: () => console.info('completed'),
    // });
    this._store.select(selectIsAuthenticated).subscribe({
      next: (isAuthenticated) => {
        this.isAuthenticated = isAuthenticated;
        console.log('Authentication - ', this.isAuthenticated);
      },
      error: (err) => (this.errorMessage = err),
      complete: () => console.info('Completed'),
    });
  }

  public onCancel() {
    if (this.isAuthenticated) {
      this._router.navigate(['/login']);
    } else this._location.back();
  }

  constructor(
    private _financeService: FinanceService,
    private _router: Router,
    private _store: Store<AuthenticationState>,
    private _location: Location,
    private matDialogConfig: MatDialogRef<UnauthorizedServeResponseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {
    this.errorMessage = data;
  }
}

import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from './store/state/ui.state';
import { selectIsLoading } from './store/selectors/ui.selectors';
import { AuthenticationActions } from './authentication/store/actions/authentication.actions';
import { AuthenticationState } from './authentication/store/state/authentication.state';
import { AuthenticationService } from './_helpers/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public errorMessage!: string;
  public isLoading!: boolean;

  ngOnInit() {
    this._router.events.subscribe({
      next: (event) => {
        if (event instanceof NavigationStart) {
          console.log('Navigation Route -', event);
        }
      },
      error: (err) => (this.errorMessage = err),
      complete: () => console.info('Complete'),
    });

    this._store.select(selectIsLoading).subscribe({
      next: (loadingState) => {
        this.isLoading = loadingState;
      },
      error: (err) => (this.errorMessage = err),
      complete: () => console.log('Completed'),
    });
    this._store.dispatch(
      AuthenticationActions['[Authentication]UserAutoLogin']()
    );
  }

  constructor(
    private readonly _router: Router,
    private readonly _store: Store<State | AuthenticationState>
  ) {}
}

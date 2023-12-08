import { Component, OnInit } from '@angular/core';
import { selectIsLoading } from '@app/store/selectors/ui.selectors';
import { State } from '@app/store/state/ui.state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.css'],
})
export class LoadingSpinnerComponent implements OnInit {
  public isLoading!: boolean;
  public errorMessage!: string;

  ngOnInit() {
    this._store.select(selectIsLoading).subscribe({
      next: (isLoadingState) => {
        this.isLoading = isLoadingState;
        console.log('IsLoadingStateInSpinner - ', this.isLoading);
      },
      error: (err) => (this.errorMessage = err),
      complete: () => console.info('Completeed'),
    });
  }

  constructor(private _store: Store<State>) {}
}

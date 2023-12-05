import { Component, OnInit, inject } from '@angular/core';
import { selectIsLoading } from '@app/authentication/store/selectors/authentication.selector';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.css'],
})
export class LoadingSpinnerComponent implements OnInit {
  public isLoading: boolean = false;
  public errorMessage!: string;

  ngOnInit(): void {
    this._store.select(selectIsLoading).subscribe({
      next: (isLoadingState) => {
        (this.isLoading = isLoadingState);
        console.log('IsLoadingValue-', isLoadingState);
      },
      error: (err) => (this.errorMessage = err),
      complete: () => console.info('Completed'),
    });
  }
  constructor(private _store: Store) {}
}

import { Component, OnInit, inject } from '@angular/core';
import { ErrorService } from '@app/_helpers/services/error.service';

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.css'],
})
export class ErrorsComponent implements OnInit {
  public httpErrorMessage: string = '';
  public errorMessage!: string;

  public ngOnInit(): void {
    this._errorService._data.subscribe({
      next: (serviceErrorMessage) => {
        this.httpErrorMessage = serviceErrorMessage;
        console.log('Error Service Message- ', this.httpErrorMessage);
      },
      error: (err) => (this.errorMessage = err),
      complete: () => console.info('Completed'),
    });
  }

  constructor(private _errorService: ErrorService) {}
}

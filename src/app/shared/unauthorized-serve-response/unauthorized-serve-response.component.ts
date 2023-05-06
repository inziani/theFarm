import { Component, OnInit } from '@angular/core';
import { FinanceService } from '@app/core/services/finance.service';

@Component({
  selector: 'app-unauthorized-serve-response',
  templateUrl: './unauthorized-serve-response.component.html',
  styleUrls: ['./unauthorized-serve-response.component.css'],
})
export class UnauthorizedServeResponseComponent {
  public navigationError!: string;
  public errorMessage!: string;

  constructor(
    private _financeService: FinanceService
  ) {

  }

  ngOnInit() {
    this._financeService.data.subscribe({
      next: (data: string) => (this.navigationError = data),
      error: (err) => this.errorMessage = err,
      complete:() => console.info('completed')
    });

  }
}

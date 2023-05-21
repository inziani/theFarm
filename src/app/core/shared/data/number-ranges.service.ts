import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FinanceService } from '@app/core/services/finance.service';

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NumberRangesService {
  public glAccountNumber!: number;
  private accData$ = new BehaviorSubject<number>(this.glAccountNumber);
  readonly glAccountNumberStatus = this.accData$.asObservable();
  public errorMessage!: string;

  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      accept: 'application/json',
    })
  }

  constructor(
    private _http: HttpClient,
    private _financeService: FinanceService
  ) {}

  public generateGLAccountNumber(){
    this._financeService.fetchGeneralLedgerAccountsList().subscribe({
      next: (generalLedgerMasterDataList) => {
        const maxAccNum = generalLedgerMasterDataList.map((glAccountNumber) => glAccountNumber.accountNumber);
        if (!maxAccNum.length) {
          this.glAccountNumber = 1000000000
          this.accData$.next(this.glAccountNumber);
        
        } else
        {
          this.glAccountNumber += Math.max(...maxAccNum);
          this.accData$.next(this.glAccountNumber);
        }
      },
      error: (err) => this.errorMessage = err,
      complete: () => console.info('Complete account Number Generation')
    });

  }
}



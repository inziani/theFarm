import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NumberRangesService {
  public glAccountNumber: number = 1000000000;
  private accData$ = new BehaviorSubject<number>(this.glAccountNumber);
  readonly glAccountNumberStatus = this.accData$.asObservable();

  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      accept: 'application/json',
    })
  }

  constructor(
    private _http: HttpClient
  ) {}

  public createGLAccNum() {
    this.glAccountNumber += 1;
    let accNumData = this.glAccountNumber
    console.log('AccNum-', this.glAccountNumber);
    this.accData$.next(this.glAccountNumber);
    return this._http.post<Number>(`${environment.apiUrl}/numbers/`, {accNumData}, this.httpOptions);
  }

  }



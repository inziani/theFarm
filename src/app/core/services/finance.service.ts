import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { environment } from '@environments/environment';
import { CompanyMasterDataModel } from '@app/finance/finance-models/fi-data-models/organization-data-models';
import { Observable, catchError, throwError } from 'rxjs';
import { GeneralLedgerMasterDataModel } from '@app/finance/finance-models/fi-data-models/gl-account-master-model';



@Injectable({
  providedIn: 'root'
})

export class FinanceService {
  public httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  public companyListing!: CompanyMasterDataModel[];

  constructor(
    private http: HttpClient,


  ) { }

  createCompanyMasterData(
    company: string,
    companyName: string,
    street: string,
    postOfficeBox: number,
    postalCode: number,
    country: string,
    language: string,
    currency: string,
    landLine: number,
    mobileNumber: string,
    email: string
  ): Observable<CompanyMasterDataModel> {
    return this.http.post<CompanyMasterDataModel>(`${environment.apiUrl}/company/`, JSON.stringify({
      company, companyName, street, postOfficeBox, postalCode, country, language, currency, landLine, mobileNumber, email
    }), this.httpOptions).pipe(catchError(this.handleError));

  };

  fetchCompanyData(): Observable<CompanyMasterDataModel[]> {
    return this.http.get<CompanyMasterDataModel[]>(`${environment.apiUrl}/company/`, this.httpOptions)

  }

  createGeneralLedgerAccountMasterData(
  ): Observable<GeneralLedgerMasterDataModel> {
    return this.http.post<GeneralLedgerMasterDataModel>(`${environment.apiUrl}/generalLedgerAccountMaster/`, JSON.stringify({}), this.httpOptions);

  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';

    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
      errorMessage = `Backend returned code ${error.status}, body was: `, error.error;
    }
    // Return an observable with a user-facing error message.
    errorMessage = `Backend returned code ${error.status}, body was: `, error.error;
    return throwError(() => new Error(errorMessage));
  }
}

import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { environment } from '@environments/environment';
import { ChartOfAccountsMasterDataModel, CompanyCodeMasterDataModel, CompanyMasterDataModel } from '@app/finance/finance-models/fi-data-models/organization-data-models';
import { Observable, catchError, throwError, BehaviorSubject, Observer } from 'rxjs';
import { GeneralLedgerMasterDataModel } from '@app/finance/finance-models/fi-data-models/gl-account-master-model';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';



@Injectable({
  providedIn: 'root'
})

export class FinanceService {

  public httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  public companyListing!: CompanyMasterDataModel[];
  public orgUnitSelected = new EventEmitter<string>();
  private dataSource = new BehaviorSubject<string>('');
  public data: Observable<string> = this.dataSource.asObservable();
  public companyCodeListing!: CompanyCodeMasterDataModel[];
  public companyCode!: CompanyCodeMasterDataModel;

  constructor(
    private http: HttpClient,
  ) { }

  // Cross component communication
  public sendData(data: string) {
    this.dataSource.next(data);
  }

  // End of Cross component communication


  // Orginizational Data
  // Company Data
  public createCompanyMasterData(
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
    }), this.httpOptions);

  };

  public fetchCompanyData(): Observable<CompanyMasterDataModel[]> {
    return this.http.get<CompanyMasterDataModel[]>(`${environment.apiUrl}/company/`, this.httpOptions)
  }

  public fetchSingleCompany(id: number): Observable<CompanyMasterDataModel> {
    return this.http.get<CompanyMasterDataModel>(`${environment.apiUrl}/company/` + id + '/', this.httpOptions);
  }

  public editSingleCompany(
    id: number,
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
    email: string,
  ): Observable<CompanyMasterDataModel> {
    return this.http.patch<CompanyMasterDataModel>(`${environment.apiUrl}/company/` + id + '/',
      {
        companyName,
        street,
        postOfficeBox,
        postalCode,
        country,
        language,
        currency,
        landLine,
        mobileNumber,
        email

    }, this.httpOptions);
  }

   public deleteCompany(id: number): Observable<CompanyMasterDataModel> {
     return this.http.delete<CompanyMasterDataModel>(`${environment.apiUrl}/company/` + id + '/');
  }


// Company Code Data

  public fetchCompanyCodeData(): Observable<CompanyCodeMasterDataModel[]> {
    return this.http.get<CompanyCodeMasterDataModel[]>(`${environment.apiUrl}/companyCode/`, this.httpOptions);
  }

  public fetchSingleCompanyCode(id: number): Observable<CompanyCodeMasterDataModel> {
    return this.http.get<CompanyCodeMasterDataModel>(`${environment.apiUrl}/companyCode/` + id + '/', this.httpOptions);

  }

  public createCompanyCodeMasterData(
    companyCode: number,
    companyCodeName: string,
    company: string,
  ): Observable<CompanyCodeMasterDataModel> {
    return this.http.post<CompanyCodeMasterDataModel>(`${environment.apiUrl}/companyCode/`, JSON.stringify(
      {
      companyCode,
      companyCodeName,
      company
      }
    ), this.httpOptions);
  };

  public editCompanyCodeMasterData(
    id: number,
    companyCode: number,
    companyCodeName: string,
    company: string,
  ): Observable<CompanyCodeMasterDataModel>
  {
    return this.http.patch<CompanyCodeMasterDataModel>(`${environment.apiUrl}/companyCode/` + id + '/',
      {
      companyCode,
      companyCodeName,
      company
      },
      this.httpOptions);
  };

   public deleteCompanyCode(id: number): Observable<CompanyCodeMasterDataModel> {
     return this.http.delete<CompanyCodeMasterDataModel>(`${environment.apiUrl}/companyCode/` + id + '/');
  }

// End of Company Code Data
// Chart Of Accounts
  public fetchChartOfAccountsData(): Observable<ChartOfAccountsMasterDataModel[]>{
    return this.http.get<ChartOfAccountsMasterDataModel[]>(`${environment.apiUrl}/chartOfAccounts/`, this.httpOptions);
  }

  public fetchSingleChartOfAccounts(id: number): Observable<ChartOfAccountsMasterDataModel>{
    return this.http.get<ChartOfAccountsMasterDataModel>(`${environment.apiUrl}/chartOfAccounts/` + id + '/', this.httpOptions);
  }

  public createChartOfAccountsMasterData(
    coaCode: string,
    companyCode: string,
    chartOfAccountsName: string,
    language: string,
    lengthAccNumber: number,
    blockedForPosting: boolean
  ): Observable<ChartOfAccountsMasterDataModel> {
    return this.http.post<ChartOfAccountsMasterDataModel>(`${environment.apiUrl}/chartOfAccounts/`, {
      coaCode,
      companyCode,
      chartOfAccountsName,
      language,
      lengthAccNumber,
      blockedForPosting
    }, this.httpOptions);
  }

  public editSingleChartOfAccountsMasterData(
    id: number,
    coaCode: string,
    companyCode: string,
    chartOfAccountsName: string,
    language: string,
    lengthAccNumber: number,
    blockedForPosting: boolean
  ): Observable<ChartOfAccountsMasterDataModel> {
    return this.http.patch<ChartOfAccountsMasterDataModel>(`${environment.apiUrl}/chartOfAccounts/` + id + '/', {
      coaCode,
      companyCode,
      chartOfAccountsName,
      language,
      lengthAccNumber,
      blockedForPosting
    }, this.httpOptions);

  }

  public displaySingleChartOfAccountsMasterData(id: number): Observable<ChartOfAccountsMasterDataModel>{
    return this.http.get<ChartOfAccountsMasterDataModel>(`${environment.apiUrl}/chartOfAccounts/` + id + '/', this.httpOptions);
  }

  public deleteChartOfAccountsMasterData(id: number): Observable<ChartOfAccountsMasterDataModel>{
    return this.http.delete<ChartOfAccountsMasterDataModel>(`${environment.apiUrl}/chartOfAccounts/` + id + '/', this.httpOptions);
  }



// End of Chart of accaounts
// End of Organization Data

// General Ledger Data

    public createGeneralLedgerAccountMasterData(
  ): Observable<GeneralLedgerMasterDataModel> {
    return this.http.post<GeneralLedgerMasterDataModel>(`${environment.apiUrl}/generalLedgerAccountMaster/`, JSON.stringify({}), this.httpOptions);

    }
// End of General Ledger Data

// Error Handling
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

  // End of Error Handling

}

import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { environment } from '@environments/environment';
import { BusinessAreaMasterData, ChartOfAccountsMasterData, CompanyCodeMasterData, CompanyMasterData, ControllingAreaMasterData } from '@app/finance/finance-models/fi-data-models/organization-data-models';
import { Observable, throwError, BehaviorSubject, Observer } from 'rxjs';
import { GeneralLedgerMasterData } from '@app/finance/finance-models/fi-data-models/gl-account-master-model';




@Injectable({
  providedIn: 'root',
})
export class FinanceService {
  public httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  public orgUnitSelected = new EventEmitter<string>();
  private dataSource = new BehaviorSubject<string>('');
  public data: Observable<string> = this.dataSource.asObservable();


  constructor(private http: HttpClient) {}

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
  ): Observable<CompanyMasterData> {
    return this.http.post<CompanyMasterData>(
      `${environment.apiUrl}/company/`,
      JSON.stringify({
        company,
        companyName,
        street,
        postOfficeBox,
        postalCode,
        country,
        language,
        currency,
        landLine,
        mobileNumber,
        email,
      }),
      this.httpOptions
    );
  }

  public fetchCompanyData(): Observable<CompanyMasterData[]> {
    return this.http.get<CompanyMasterData[]>(
      `${environment.apiUrl}/company/`,
      this.httpOptions
    );
  }

  public fetchSingleCompany(id: number): Observable<CompanyMasterData> {
    return this.http.get<CompanyMasterData>(
      `${environment.apiUrl}/company/` + id + '/',
      this.httpOptions
    );
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
    email: string
  ): Observable<CompanyMasterData> {
    return this.http.patch<CompanyMasterData>(
      `${environment.apiUrl}/company/` + id + '/',
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
        email,
      },
      this.httpOptions
    );
  }

  public deleteCompany(id: number): Observable<CompanyMasterData> {
    return this.http.delete<CompanyMasterData>(
      `${environment.apiUrl}/company/` + id + '/'
    );
  }

  // Company Code Data

  public fetchCompanyCodeData(): Observable<CompanyCodeMasterData[]> {
    return this.http.get<CompanyCodeMasterData[]>(
      `${environment.apiUrl}/companyCode/`,
      this.httpOptions
    );
  }

  public fetchSingleCompanyCode(
    id: number
  ): Observable<CompanyCodeMasterData> {
    return this.http.get<CompanyCodeMasterData>(
      `${environment.apiUrl}/companyCode/` + id + '/',
      this.httpOptions
    );
  }

  public createCompanyCodeMasterData(
    companyCode: number,
    companyCodeName: string,
    company: string
  ): Observable<CompanyCodeMasterData> {
    return this.http.post<CompanyCodeMasterData>(
      `${environment.apiUrl}/companyCode/`,
      JSON.stringify({
        companyCode,
        companyCodeName,
        company,
      }),
      this.httpOptions
    );
  }

  public editCompanyCodeMasterData(
    id: number,
    companyCode: number,
    companyCodeName: string,
    company: string
  ): Observable<CompanyCodeMasterData> {
    return this.http.patch<CompanyCodeMasterData>(
      `${environment.apiUrl}/companyCode/` + id + '/',
      {
        companyCode,
        companyCodeName,
        company,
      },
      this.httpOptions
    );
  }

  public deleteCompanyCode(id: number): Observable<CompanyCodeMasterData> {
    return this.http.delete<CompanyCodeMasterData>(
      `${environment.apiUrl}/companyCode/` + id + '/'
    );
  }

  // End of Company Code Data
  // Chart Of Accounts
  public fetchChartOfAccountsData(): Observable<
    ChartOfAccountsMasterData[]
  > {
    return this.http.get<ChartOfAccountsMasterData[]>(
      `${environment.apiUrl}/chartOfAccounts/`,
      this.httpOptions
    );
  }

  public fetchSingleChartOfAccounts(
    id: number
  ): Observable<ChartOfAccountsMasterData> {
    return this.http.get<ChartOfAccountsMasterData>(
      `${environment.apiUrl}/chartOfAccounts/` + id + '/',
      this.httpOptions
    );
  }

  public createChartOfAccountsMasterData(
    coaCode: string,
    companyCode: string,
    chartOfAccountsName: string,
    language: string,
    lengthAccNumber: number,
    blockedForPosting: boolean
  ): Observable<ChartOfAccountsMasterData> {
    return this.http.post<ChartOfAccountsMasterData>(
      `${environment.apiUrl}/chartOfAccounts/`,
      {
        coaCode,
        companyCode,
        chartOfAccountsName,
        language,
        lengthAccNumber,
        blockedForPosting,
      },
      this.httpOptions
    );
  }

  public editSingleChartOfAccountsMasterData(
    id: number,
    coaCode: string,
    companyCode: string,
    chartOfAccountsName: string,
    language: string,
    lengthAccNumber: number,
    blockedForPosting: boolean
  ): Observable<ChartOfAccountsMasterData> {
    return this.http.patch<ChartOfAccountsMasterData>(
      `${environment.apiUrl}/chartOfAccounts/` + id + '/',
      {
        coaCode,
        companyCode,
        chartOfAccountsName,
        language,
        lengthAccNumber,
        blockedForPosting,
      },
      this.httpOptions
    );
  }

  public displaySingleChartOfAccountsMasterData(
    id: number
  ): Observable<ChartOfAccountsMasterData> {
    return this.http.get<ChartOfAccountsMasterData>(
      `${environment.apiUrl}/chartOfAccounts/` + id + '/',
      this.httpOptions
    );
  }

  public deleteChartOfAccountsMasterData(
    id: number
  ): Observable<ChartOfAccountsMasterData> {
    return this.http.delete<ChartOfAccountsMasterData>(
      `${environment.apiUrl}/chartOfAccounts/` + id + '/',
      this.httpOptions
    );
  }

  // End of Chart of accaounts

  // Beginning of Controlling Area Data

  public fetchControllingAreaData(): Observable<
    ControllingAreaMasterData[]
  > {
    return this.http.get<ControllingAreaMasterData[]>(
      `${environment.apiUrl}/controllingArea/`,
      this.httpOptions
    );
  }

  public fetchSingleControllingArea(
    id: number
  ): Observable<ControllingAreaMasterData> {
    return this.http.get<ControllingAreaMasterData>(
      `${environment.apiUrl}/controllingArea/` + id + '/',
      this.httpOptions
    );
  }

  public createControllingAreaMasterData(
    controllingArea: string,
    controllingAreaName: string,
    personResponsible: string,
    companyCode: string
  ): Observable<ControllingAreaMasterData> {
    return this.http.post<ControllingAreaMasterData>(
      `${environment.apiUrl}/controllingArea/`,
      {
        controllingArea,
        controllingAreaName,
        personResponsible,
        companyCode,
      },
      this.httpOptions
    );
  }

  public editSingleControllingAreaMasterData(
    id: number,
    controllingArea: string,
    controllingAreaName: string,
    personResponsible: string,
    companyCode: string
  ): Observable<ControllingAreaMasterData> {
    return this.http.patch<ControllingAreaMasterData>(
      `${environment.apiUrl}/controllingArea/` + id + '/',
      {
        controllingArea,
        controllingAreaName,
        personResponsible,
        companyCode,
      },
      this.httpOptions
    );
  }

  public deleteControllingAreaMasterData(
    id: number
  ): Observable<ControllingAreaMasterData> {
    return this.http.delete<ControllingAreaMasterData>(
      `${environment.apiUrl}/controllingArea/` + id + '/',
      this.httpOptions
    );
  }
  // End of Controlling Area Data

  // Beginning of Business Area

  public fetchBusinessAreaData(): Observable<BusinessAreaMasterData[]> {
    return this.http.get<BusinessAreaMasterData[]>(
      `${environment.apiUrl}/businessArea/`,
      this.httpOptions
    );
  }

  public fetchSingleBusinessArea(
    id: number
  ): Observable<BusinessAreaMasterData> {
    return this.http.get<BusinessAreaMasterData>(
      `${environment.apiUrl}/businessArea/` + id + '/',
      this.httpOptions
    );
  }

  public createBusinessAreaMasterData(
    businessArea: string,
    businessAreaName: string,
    personResponsible: string,
    companyCode: string
  ): Observable<BusinessAreaMasterData> {
    return this.http.post<BusinessAreaMasterData>(
      `${environment.apiUrl}/businessArea/`,
      {
        businessArea,
        businessAreaName,
        personResponsible,
        companyCode,
      },
      this.httpOptions
    );
  }

  public editSingleBusinessAreaMasterData(
    id: number,
    businessArea: string,
    businessAreaAreaName: string,
    personResponsible: string,
    companyCode: string
  ): Observable<BusinessAreaMasterData> {
    return this.http.patch<BusinessAreaMasterData>(
      `${environment.apiUrl}/businessArea/` + id + '/',
      {
        businessArea,
        businessAreaAreaName,
        personResponsible,
        companyCode,
      },
      this.httpOptions
    );
  }

  public deleteBusinessAreaMasterData(
    id: number
  ): Observable<BusinessAreaMasterData> {
    return this.http.delete<BusinessAreaMasterData>(
      `${environment.apiUrl}/businessArea/` + id + '/',
      this.httpOptions
    );
  }
  // End of Business Area
  // End of Organization Data

  // General Ledger Data

  public createGeneralLedgerAccountMasterData(
    accountNumber: number,
    companyCode: string,
    chartOfAccounts: string,
    accountGroup: string,
    accountType: string,
    reconciliationAccountInput: boolean,
    reconciliationAccountType: string,
    alternativeGLAccount: number,
    shortDescription: string,
    longDescription: string,
    profitAndLossAccount: boolean,
    balanceSheetAccount: boolean,
    accountCurrency: string,
    balancesInLocalCurrency: boolean,
    exchangeRateKey: string,
    taxCategory: string,
    postingWithoutTaxAllowed: boolean,
    openItemManagement: boolean,
    lineItemManagement: boolean,
    blockedForPosting: boolean,
    markedForDeletion: boolean,
    groupAccountNumber: number,
    tradingPartner: string,
    sortKey: string,
    authorizationGroup: string,
    fieldStatusGroup: string,
    postAutomaticallyOnly: boolean,
    relevantToCashFlow: boolean,
    houseBank: string,
    houseBankAccountID: number,
    interestIndicator: boolean,
    interestCalculationFrequency: number,
    lastDateOfInterestCalculation: Date,
    keyDateofLastInterest: Date,
    controllingArea: string,
    costElement: number,
    unitOfMeasure: string,
    businessArea: string,
    valuationGroup: string,
    inflationKey: string,
    toleranceGroup: string,
    planningLevel: string,
    accountManagedinExternalSystem: number,
    supplementAutomaticPostings: boolean
  ): Observable<GeneralLedgerMasterData> {
    return this.http.post<GeneralLedgerMasterData>(
      `${environment.apiUrl}/generalLedgerAccountMaster/`,
      {
        accountNumber,
        companyCode,
        chartOfAccounts,
        accountGroup,
        accountType,
        reconciliationAccountInput,
        reconciliationAccountType,
        alternativeGLAccount,
        shortDescription,
        longDescription,
        profitAndLossAccount,
        balanceSheetAccount,
        accountCurrency,
        balancesInLocalCurrency,
        exchangeRateKey,
        taxCategory,
        postingWithoutTaxAllowed,
        openItemManagement,
        lineItemManagement,
        blockedForPosting,
        markedForDeletion,
        groupAccountNumber,
        tradingPartner,
        sortKey,
        authorizationGroup,
        fieldStatusGroup,
        postAutomaticallyOnly,
        relevantToCashFlow,
        houseBank,
        houseBankAccountID,
        interestIndicator,
        interestCalculationFrequency,
        lastDateOfInterestCalculation,
        keyDateofLastInterest,
        controllingArea,
        costElement,
        unitOfMeasure,
        businessArea,
        valuationGroup,
        inflationKey,
        toleranceGroup,
        planningLevel,
        accountManagedinExternalSystem,
        supplementAutomaticPostings,
      },
      this.httpOptions
    );
  }

  public fetchGeneralLedgerAccounts(): Observable<GeneralLedgerMasterData>{
    return this.http.get<GeneralLedgerMasterData>(
      `${environment.apiUrl}/generalLedgerAccountMaster/`, this.httpOptions
    );
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
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
      (errorMessage = `Backend returned code ${error.status}, body was: `),
        error.error;
    }
    // Return an observable with a user-facing error message.
    (errorMessage = `Backend returned code ${error.status}, body was: `),
      error.error;
    return throwError(() => new Error(errorMessage));
  }

  // End of Error Handling
}

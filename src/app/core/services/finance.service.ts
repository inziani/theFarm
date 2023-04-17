import { EventEmitter, Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';

import { environment } from '@environments/environment';
import {
  BusinessAreaMasterData,
  ChartOfAccountsMasterData,
  CompanyCodeMasterData,
  CompanyMasterData,
  ControllingAreaMasterData,
  GLAccountGroup,
  TaxCode,
} from '@app/finance/finance-models/fi-data-models/organization-data-models';
import { Observable, BehaviorSubject, throwError, catchError } from 'rxjs';
import { GeneralLedgerMasterData } from '@app/finance/finance-models/fi-data-models/gl-account-master-model';

@Injectable({
  providedIn: 'root',
})
export class FinanceService {
  public httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  public itemSelected = new EventEmitter<string>();
  private _dataSource$ = new BehaviorSubject<string>('');
  readonly data: Observable<string> = this._dataSource$.asObservable();
  private _glAccountGroupslist: GLAccountGroup[] = [
    {
      id: 1,
      accountGroup: 'accountGroup',
      description: 'accountGroupDescription',
    },
  ];
  private _glAccountGroups$ = new BehaviorSubject<GLAccountGroup[]>(
    this._glAccountGroupslist
  );
  readonly glAccountGroupsData: Observable<GLAccountGroup[]> =
    this._glAccountGroups$.asObservable();

  private _id = 0;
  public readonly glAccountNumber!: number;

  constructor(private http: HttpClient) {}

  // Cross component communication
  public sendData(data: string) {
    this._dataSource$.next(data);
  }

  public sendAccountGroupsData() {
    this._glAccountGroupslist = [];
    this._glAccountGroups$.next(this._glAccountGroupslist);
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

  public fetchSingleCompanyCode(id: number): Observable<CompanyCodeMasterData> {
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
  public fetchChartOfAccountsData(): Observable<ChartOfAccountsMasterData[]> {
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

  public fetchControllingAreaData(): Observable<ControllingAreaMasterData[]> {
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

  public fetchGeneralLedgerAccountsList(): Observable<
    GeneralLedgerMasterData[]
  > {
    return this.http.get<GeneralLedgerMasterData[]>(
      `${environment.apiUrl}/generalLedgerAccountMaster/`,
      this.httpOptions
    );
  }

  public fetchSingleGLAccountMaster(
    id: number
  ): Observable<GeneralLedgerMasterData> {
    return this.http.get<GeneralLedgerMasterData>(
      `${environment.apiUrl}/generalLedgerAccountMaster/` + id + '/',
      this.httpOptions
    );
  }

  // AccountGroups

  public createGLAccountGroup(
    accountGroup: string,
    description: string
  ): Observable<GLAccountGroup> {
    return this.http.post<GLAccountGroup>(
      `${environment.apiUrl}/generalLedgerAccountGroup/`,
      {
        accountGroup,
        description,
      },
      this.httpOptions
    )
  }

  public fetchGLAccountGroupsData(): Observable<GLAccountGroup[]> {
    return this.http.get<GLAccountGroup[]>(
      `${environment.apiUrl}/generalLedgerAccountGroup/`,
      this.httpOptions
    );
  }

  public fetchSingleGLAccountGroup(id: number): Observable<GLAccountGroup> {
    return this.http.get<GLAccountGroup>(
      `${environment.apiUrl}/generalLedgerAccountGroup/` + id + '/',
      this.httpOptions
    );
  }

  public editSingleGLAccountGroup(
    id: number,
    accountGroup: string,
    description: string
  ): Observable<GLAccountGroup> {
    return this.http.patch<GLAccountGroup>(
      `${environment.apiUrl}/generalLedgerAccountGroup/` + id + '/',
      {
        description,
      },
      this.httpOptions
    );
  }

  public deleteAccountGroup(id: number): Observable<GLAccountGroup> {
    return this.http.delete<GLAccountGroup>(
      `${environment.apiUrl}/generalLedgerAccountGroup/` + id + '/',
      this.httpOptions
    );
  }

  public createTaxCode(
    taxCode: string,
    taxCodeDescription: string,
    taxCodePercentage: number
  ): Observable<TaxCode> {
    return this.http.post<TaxCode>(
      `${environment.apiUrl}/taxCodes/`,
      {
        taxCode,
        taxCodeDescription,
        taxCodePercentage,
      },
      this.httpOptions
    );
  }

  public fetchTaxCodeData(): Observable<TaxCode[]> {
    return this.http.get<TaxCode[]>(
      `${environment.apiUrl}/taxCodes/`,
      this.httpOptions
    );
  }

  public fetchSingleTaxCode(id: number): Observable<TaxCode> {
    return this.http.get<TaxCode>(
      `${environment.apiUrl}/taxCodes/` + id + '/',
      this.httpOptions
    );
  }

  public editTaxCode(
    id: number,
    taxCodeDescription: string,
    taxCodePercentage: number
  ): Observable<TaxCode> {
    return this.http.patch<TaxCode>(
      `${environment.apiUrl}/taxCodes/` + id + '/',
      {
        taxCodeDescription,
        taxCodePercentage,
      },
      this.httpOptions
    );
  }

  public deleteTaxCode(id: number): Observable<TaxCode> {
    return this.http.delete<TaxCode>(
      `${environment.apiUrl}/taxCodes/` + id + '/',
      this.httpOptions
    );
  }

  // End of General Ledger Data

  // Error Handling

  private _handleError(error: HttpErrorResponse) {
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
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}

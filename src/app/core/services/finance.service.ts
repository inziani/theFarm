import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '@environments/environment';
import { CompanyMasterDataModel } from '@app/finance/finance-models/fi-data-models/organization-data-models';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})

export class FinanceService {
  public httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

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
    }), this.httpOptions)

  };
}

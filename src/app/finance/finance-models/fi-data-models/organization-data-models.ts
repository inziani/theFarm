export interface CompanyMasterData{

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
}

export interface CompanyCodeMasterData{

     id: number,
     companyCode: number,
     companyCodeName: string,
     company: string,
}

export interface ChartOfAccountsMasterData{

     id: number,
     coaCode: string,
     companyCode: string,
     chartOfAccountsName: string,
     language: string,
     lengthAccNumber: number,
     blockedForPosting: boolean

}

export interface ReportingArea{

     id: number,
     reportingArea: string,
     reportingAreaName: string,
     personReponsible: string,
     companyCode: string

}

export interface ControllingAreaMasterData{

     id: number,
     controllingArea: string,
     controllingAreaName: string,
     personReponsible: string,
     companyCode: string

}

export interface BusinessAreaMasterData{

     id: number,
     businessArea: string,
     businessAreaName: string,
     personResponsible: string,
     companyCode: string

}

export interface SalesArea{

     salesArea: string,
     salesAreaName: string,
     personResponsible: string,
     companyCode: string

}

export interface GLAccountGroup {
  accountGroup: string;
  accountGroupDescription: string;
}



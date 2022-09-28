export class CompanyMasterDataModel{

  constructor(

    public id: number,
    public company: string,
    public companyName: string,
    public street: string,
    public postOfficeBox: number,
    public postalCode: number,
    public country: string,
    public language: string,
    public currency: string,
    public landLine: number,
    public mobileNumber: string,
    public email: string
  ) {

  }
}

export class CompanyCodeMasterDataModel{

  constructor(
    public id: number,
    public companyCode: number,
    public companyCodeName: string,
    public company: string,
  ) {

  }
}

export class ChartOfAccountsMasterDataModel{

  constructor(
    public id: number,
    public coaCode: string,
    public companyCode: string,
    public chartOfAccountsName: string,
    public language: string,
    public lengthAccNumber: number,
    public blockedForPosting: boolean

  ) {

  }
}

export class ReportingArea{

  constructor(
    public id: number,
    public reportingArea: string,
    public reportingAreaName: string,
    public personReponsible: string,
    public companyCode: string

  ) {

  }
}

export class ControllingAreaMasterDataModel{

  constructor(
    public id: number,
    public controllingArea: string,
    public controllingAreaName: string,
    public personReponsible: string,
    public companyCode: string
  ) {

  }
}

export class BusinessAreaMasterDataModel{

  constructor(
    public id: number,
    public businessArea: string,
    public businessAreaName: string,
    public personResponsible: string,
    public companyCode: string
  ) {

  }
}

export class SalesArea{

  constructor(
    public salesArea: string,
    public salesAreaName: string,
    public personResponsible: string,
    public companyCode: string

  ){

  }
}



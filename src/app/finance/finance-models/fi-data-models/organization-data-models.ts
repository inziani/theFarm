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

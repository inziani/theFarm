export class CompanyMasterDataModel{

  constructor(

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

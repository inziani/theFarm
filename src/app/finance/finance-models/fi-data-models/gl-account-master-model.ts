export class GlMasterDataModel{

  constructor(
    
    public accountNumber: number,
    public companyCode: string,
    public chartOfAccounts: string,
    public accountGroup: string,
    public accountType: string,
    public reconciliationAccountInput: boolean,
    public reconciliationAccountType: string,
    public alternativeGLAccount: number,
    public shortDescription: string,
    public longDescription: string,
    public profitAndLossAccount: boolean,
    public balanceSheetAccount: boolean,
    public accountCurrency: string,
    public balancesInLocalCurrency: boolean,
    public exchangeRateKey: string,
    public taxCategory: string,
    public postingWithoutTaxAllowed: boolean,
    public openItemManagement: boolean,
    public lineItemManagement: boolean,
    public blockedForPosting: boolean,
    public markedForDeletion: boolean,
    public groupAccountNumber: number,
    public tradingPartner: string,
    public sortKey: string,
    public authorizationGroup: string,
    public fieldStatusGroup: string,
    public postAutomaticallyOnly: boolean,
    public relevantToCashFlow: boolean,
    public houseBank: string,
    public houseBankAccountID: number,
    public interestIndicator: boolean,
    public interestCalculationFrequency: number,
    public lastDateOfInterestCalculation: Date,
    public keyDateofLastInterest: Date,
    public controllingArea: string,
    public costElement: number,
    public unitOfMeasure: string,
    public businessArea: string,
    public valuationGroup: string,
    public inflationKey: string,
    public toleranceGroup: string,
    public planningLevel: string,
    public accountManagedinExternalSystem: number,
    public supplementAutomaticPostings: boolean,




          ) {

  }
}

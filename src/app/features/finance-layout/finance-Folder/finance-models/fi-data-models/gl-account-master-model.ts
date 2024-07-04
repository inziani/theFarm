import { CompanyCodeMasterData, ChartOfAccountsMasterData, ControllingAreaMasterData, BusinessAreaMasterData,  } from './organization-data-models';

export class GeneralLedgerMasterData {
  id: number;
  accountNumber: number;
  companyCode: string;
  chartOfAccounts: string;
  accountGroup: string;
  accountType: string;
  reconciliationAccountInput: boolean;
  reconciliationAccountType: string;
  alternativeGLAccount: number;
  shortDescription: string;
  longDescription: string;
  profitAndLossAccount: boolean;
  balanceSheetAccount: boolean;
  accountCurrency: string;
  balancesInLocalCurrency: boolean;
  exchangeRateKey: string;
  taxCategory: string;
  postingWithoutTaxAllowed: boolean;
  openItemManagement: boolean;
  lineItemManagement: boolean;
  blockedForPosting: boolean;
  markedForDeletion: boolean;
  groupAccountNumber: number;
  tradingPartner: string;
  sortKey: string;
  authorizationGroup: string;
  fieldStatusGroup: string;
  postAutomaticallyOnly: boolean;
  relevantToCashFlow: boolean;
  houseBank: string;
  houseBankAccountID: number;
  controllingArea: string;
  costElement: number;
  unitOfMeasure: string;
  businessArea: string;
  valuationGroup: string;
  inflationKey: string;
  toleranceGroup: string;
  planningLevel: string;
  accountManagedinExternalSystem: number;
  supplementAutomaticPostings: boolean;

  constructor(
    id: number,
    accountNumber: number,
    companyCode: string,
    chartOfAccounts: string,
    accountGroup: string,
    accountType: string,
    reconciliationAccountInput: boolean = true,
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
  ) {
    (this.id = id),
      (this.accountNumber = accountNumber),
      (this.companyCode = companyCode),
      (this.chartOfAccounts = chartOfAccounts),
      (this.accountGroup = accountGroup);
      (this.accountType = accountType),
      (this.reconciliationAccountInput = true),
      (this.reconciliationAccountType = reconciliationAccountType),
      (this.alternativeGLAccount = 0),
      (this.shortDescription = shortDescription),
      (this.longDescription = longDescription),
      (this.profitAndLossAccount = true),
      (this.balanceSheetAccount = true),
      (this.accountCurrency = accountCurrency),
      (this.balancesInLocalCurrency = true),
      (this.exchangeRateKey = exchangeRateKey),
      (this.taxCategory = taxCategory),
      (this.postingWithoutTaxAllowed = true),
      (this.openItemManagement = true),
      (this.lineItemManagement = true);
      (this.blockedForPosting = false),
      (this.markedForDeletion = false);
      (this.groupAccountNumber = 0),
      (this.tradingPartner = tradingPartner),
      (this.sortKey = sortKey),
      (this.authorizationGroup = authorizationGroup),
      (this.fieldStatusGroup = fieldStatusGroup),
      (this.postAutomaticallyOnly = false),
      (this.relevantToCashFlow = true),
      (this.houseBank = houseBank);
      (this.houseBankAccountID = 0),
      (this.controllingArea = controllingArea),
      (this.costElement = 0),
      (this.unitOfMeasure = unitOfMeasure),
      (this.businessArea = businessArea),
      (this.valuationGroup = valuationGroup),
      (this.inflationKey = inflationKey),
      (this.toleranceGroup = toleranceGroup),
      (this.planningLevel = planningLevel),
      (this.accountManagedinExternalSystem = 0),
      (this.supplementAutomaticPostings = true);
  }
}

export interface GeneralLedgerMasterDataInterface {
  id: number;
  accountNumber: number;
  companyCode: CompanyCodeMasterData;
  chartOfAccounts: ChartOfAccountsMasterData;
  accountGroup: string;
  accountType: string;
  reconciliationAccountInput: boolean;
  reconciliationAccountType: string;
  alternativeGLAccount: number;
  shortDescription: string;
  longDescription: string;
  profitAndLossAccount: boolean;
  balanceSheetAccount: boolean;
  accountCurrency: string;
  balancesInLocalCurrency: boolean;
  exchangeRateKey: string;
  taxCategory: string;
  postingWithoutTaxAllowed: boolean;
  openItemManagement: boolean;
  lineItemManagement: boolean;
  blockedForPosting: boolean;
  markedForDeletion: boolean;
  groupAccountNumber: number;
  tradingPartner: string;
  sortKey: string;
  authorizationGroup: string;
  fieldStatusGroup: string;
  postAutomaticallyOnly: boolean;
  relevantToCashFlow: boolean;
  houseBank: string;
  houseBankAccountID: number;
  controllingArea: ControllingAreaMasterData;
  costElement: number;
  unitOfMeasure: string;
  businessArea: BusinessAreaMasterData;
  valuationGroup: string;
  inflationKey: string;
  toleranceGroup: string;
  planningLevel: string;
  accountManagedinExternalSystem: number;
  supplementAutomaticPostings: boolean;
}

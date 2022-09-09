import { FormControl, FormGroup, Validators } from "@angular/forms";

export class GLMasterDataFormControl extends FormControl {
  label: string;
  modelProperty: string;

  constructor(label: string, property: string, value: any, validator: any) {
    super(value, validator);
    this.label = label;
    this.modelProperty = property;
  }

  getValidationMessages() {
    let messages: string[] = [];
    if (this.errors) {
      for (let errorName in this.errors) {
        switch (errorName) {
          case "email":
            messages.push(`Please enter a valid ${this.label} address`);
            break;
          case "required":
            messages.push(`${this.label} is a required field `);
            break;
          case "minLength":
            messages.push(
              `${this.label} must be at least ${this.errors["minLength"].requiredLength} characters.`
            );
            break;
          case "maxLength":
            messages.push(
              `The ${this.label} must be ${this.errors["maxLength"].requiredLength} characters`
            );
            break;
          case "pattern":
            messages.push(
              `This ${this.label} must have a atleast one Number, a special character, uppercase and lowercase letter `
            );
            break;
        }
      }
    }
    return messages;
  }
}

export class GLMasterDataFormGroup extends FormGroup {
  constructor() {
    super({
      accountNumber: new GLMasterDataFormControl(
        "Account Number",
        "accountNumber",
        "",
        Validators.required
      ),
      companyCode: new GLMasterDataFormControl(
        "Company Code",
        "companyCode",
        "",
        Validators.required
      ),
      chartOfAccounts: new GLMasterDataFormControl(
        "Chart of Accounts",
        "chartOfAccounts",
        "",
        Validators.required
      ),
      accountGroup: new GLMasterDataFormControl(
        "Account Group",
        "accountGroup",
        "",
        Validators.required
      ),
      accountType: new GLMasterDataFormControl(
        "Account Type",
        "accountType",
        "",
        Validators.required
      ),
      reconciliationAccountInput: new GLMasterDataFormControl(
        "Reconciliation Account",
        "reconciliationAccountInput",
        "",
        Validators.required
      ),
      reconciliationAccountType: new GLMasterDataFormControl(
        "Reconciliation Account Type",
        "reconciliationAccountType",
        "",
        Validators.required
      ),
      alternativeGLAccount: new GLMasterDataFormControl(
        "Alternative GL Account",
        "alternativeGLAccount",
        "",
        Validators.required
      ),
      shortDescription: new GLMasterDataFormControl(
        "Short Description",
        "shortDescription",
        "",
        Validators.required
      ),
      longDescription: new GLMasterDataFormControl(
        "Long Description",
        "longDescription",
        "",
        Validators.required
      ),
      profitAndLossAccount: new GLMasterDataFormControl(
        "Profit and Loss account",
        "profitAndLossAccount",
        "",
        Validators.required
      ),
      balanceSheetAccount: new GLMasterDataFormControl(
        "Balance Sheet Account",
        "balanceSheetAccount",
        "",
        Validators.required
      ),
      accountCurrency: new GLMasterDataFormControl(
        "Account Currency",
        "accountCurrency",
        "",
        Validators.required
      ),
      onlyBalancesInLocalCurrency: new GLMasterDataFormControl(
        "Only Balances in Local currency",
        "onlyBalancesInLocalCurrency",
        "",
        Validators.requiredTrue
      ),
      exchangeRateKey: new GLMasterDataFormControl(
        "Exchange Rate Key",
        "exchangeRateKey",
        "",
        Validators.required
      ),
      taxCategory: new GLMasterDataFormControl(
        "Tax Category",
        "taxCategory",
        "",
        Validators.required
      ),
      postingWithoutTaxAllowed: new GLMasterDataFormControl(
        "Posting without tax allowed",
        "postingWithoutTaxAllowed",
        "",
        Validators.required
      ),
      openItemManagement: new GLMasterDataFormControl(
        "Open Item Management",
        "openItemManagement",
        "",
        Validators.required
      ),
      lineItemManagement: new GLMasterDataFormControl(
        "Line Item Management",
        "lineItemManagement",
        "",
        Validators.required
      ),
      blockedForPosting: new GLMasterDataFormControl(
        "Blocked for posting",
        "blockedForPosting",
        "",
        Validators.required
      ),
      markedForDeletion: new GLMasterDataFormControl(
        "Marked for deletion",
        "markedForDeletion",
        "",
        Validators.required
      ),
      groupAccountNumber: new GLMasterDataFormControl(
        "Group Account Number",
        "groupAccountNumber",
        "",
        Validators.required
      ),
      tradingPartner: new GLMasterDataFormControl(
        "Trading partner",
        "tradingPartner",
        "",
        Validators.required
      ),
      sortKey: new GLMasterDataFormControl(
        "Sort Key",
        "sortKey",
        "",
        Validators.required
      ),
      authorizationGroup: new GLMasterDataFormControl(
        "Authorization Group",
        "authorizationGroup",
        "",
        Validators.required
      ),
      fieldStatusGroup: new GLMasterDataFormControl(
        "Field Status Group",
        "fieldStatusGroup",
        "",
        Validators.required
      ),
      postAutomaticallyOnly: new GLMasterDataFormControl(
        "Post Automatically only",
        "postAutomaticallyOnly",
        "",
        Validators.required
      ),
      relevantToCashFlow: new GLMasterDataFormControl(
        "Relevant to Cashflow",
        "relevantToCashFlow",
        "",
        Validators.required
      ),
      houseBank: new GLMasterDataFormControl(
        "House Bank",
        "houseBank",
        "",
        Validators.required
      ),
      houseBankAccountID: new GLMasterDataFormControl(
        "House Bank Account ID",
        "houseBankAccountID",
        "",
        Validators.required
      ),
      interestIndicator: new GLMasterDataFormControl(
        "Interest Indicator",
        "interestIndicator",
        "",
        Validators.required
      ),
      interestCalculationFrequency: new GLMasterDataFormControl(
        "Interest Calculation Frequency",
        "interestCalculationFrequency",
        "",
        Validators.required
      ),
      lastDateOfInterestCalculation: new GLMasterDataFormControl(
        "Last day of interest calculation",
        "lastDateOfInterestCalculation",
        "",
        Validators.required
      ),
      keyDateofLastInterest: new GLMasterDataFormControl(
        "Key Date of Last Interest",
        "keyDateofLastInterest",
        "",
        Validators.required
      ),
      controllingArea: new GLMasterDataFormControl(
        "Controlling Area",
        "controllingArea",
        "",
        Validators.required
      ),
      costElement: new GLMasterDataFormControl(
        "Cost Element",
        "costElement",
        "",
        Validators.required
      ),
      unitOfMeasure: new GLMasterDataFormControl(
        "Unit of Measure",
        "unitOfMeasure",
        "",
        Validators.required
      ),
      businessArea: new GLMasterDataFormControl(
        "Business Area",
        "businessArea",
        "",
        Validators.required
      ),
      valuationGroup: new GLMasterDataFormControl(
        "Valuation Group",
        "valuationGroup",
        "",
        Validators.required
      ),
      inflationKey: new GLMasterDataFormControl(
        "Inflation Key",
        "inflationKey",
        "",
        Validators.required
      ),
      toleranceGroup: new GLMasterDataFormControl(
        "Tolerance Group",
        "toleranceGroup",
        "",
        Validators.required
      ),
      planningLevel: new GLMasterDataFormControl(
        "Planning Level",
        "planningLevel",
        "",
        Validators.required
      ),
      accountManagedinExternalSystem: new GLMasterDataFormControl(
        "Account Managed in External System",
        "accountManagedinExternalSystem",
        "",
        Validators.required
      ),
      supplementAutomaticPostings: new GLMasterDataFormControl(
        "Supplement Automatic Postings",
        "supplementAutomaticPostings",
        "",
        Validators.required
      ),
    });
  }

  get glMasterDataFormControls(): GLMasterDataFormControl[] {
    return Object.keys(this.controls).map(
      (k) => this.controls[k] as GLMasterDataFormControl
    );
  }
  getAccountNumberValidationMessages(accountNumber: string): string[] {
    return (
      this.controls["accountNumber"] as GLMasterDataFormControl
    ).getValidationMessages();
  }
  getCompanyCodeValidationMessages(companyCode: string): string[] {
    return (
      this.controls["companyCode"] as GLMasterDataFormControl
    ).getValidationMessages();
  }

  getChartOfAccountsValidationMessages(chartOfAccounts: string): string[] {
    return (
      this.controls["chartOfAccounts"] as GLMasterDataFormControl
    ).getValidationMessages();
  }
  getAccountGroupValidationMessages(accountGroup: string): string[] {
    return (
      this.controls["accountGroup"] as GLMasterDataFormControl
    ).getValidationMessages();
  }
  getAccountTypeValidationMessages(accountType: string): string[] {
    return (
      this.controls["accountType"] as GLMasterDataFormControl
    ).getValidationMessages();
  }

  getReconciliationAccountInputValidationMessages(
    reconciliationAccountInput: string
  ): string[] {
    return (
      this.controls["reconciliationAccountInput"] as GLMasterDataFormControl
    ).getValidationMessages();
  }
  getReconciliationAccountTypeValidationMessages(
    reconciliationAccountType: string
  ): string[] {
    return (
      this.controls["reconciliationAccountType"] as GLMasterDataFormControl
    ).getValidationMessages();
  }

  getAlternativeGLAccountValidationMessages(
    alternativeGLAccount: string
  ): string[] {
    return (
      this.controls["alternativeGLAccount"] as GLMasterDataFormControl
    ).getValidationMessages();
  }

  getShortDescriptionValidationMessages(shortDescription: string): string[] {
    return (
      this.controls["shortDescription"] as GLMasterDataFormControl
    ).getValidationMessages();
  }

  getLongDescriptionValidationMessages(longDescription: string): string[] {
    return (
      this.controls["longDescription"] as GLMasterDataFormControl
    ).getValidationMessages();
  }
  getProfitAndLossAccountValidationMessages(
    profitAndLossAccount: string
  ): string[] {
    return (
      this.controls["profitAndLossAccount"] as GLMasterDataFormControl
    ).getValidationMessages();
  }
  getbalanceSheetAccountValidationMessages(
    balanceSheetAccount: string
  ): string[] {
    return (
      this.controls["balanceSheetAccount"] as GLMasterDataFormControl
    ).getValidationMessages();
  }
  getAccountCurrencyValidationMessages(accountCurrency: string): string[] {
    return (
      this.controls["accountCurrency"] as GLMasterDataFormControl
    ).getValidationMessages();
  }
  getonlyBalancesInLocalCurrencyValidationMessages(
    onlyBalancesInLocalCurrency: string
  ): string[] {
    return (
      this.controls["onlyBalancesInLocalCurrency"] as GLMasterDataFormControl
    ).getValidationMessages();
  }
  getExchangeRateKeyValidationMessages(exchangeRateKey: string): string[] {
    return (
      this.controls["exchangeRateKey"] as GLMasterDataFormControl
    ).getValidationMessages();
  }
  getTaxCategoryValidationMessages(taxCategory: string): string[] {
    return (
      this.controls["taxCategory"] as GLMasterDataFormControl
    ).getValidationMessages();
  }
  getPostingWithoutTaxAllowedValidationMessages(
    postingWithoutTaxAllowed: string
  ): string[] {
    return (
      this.controls["postingWithoutTaxAllowed"] as GLMasterDataFormControl
    ).getValidationMessages();
  }
  getOpenItemManagementValidationMessages(
    openItemManagement: string
  ): string[] {
    return (
      this.controls["openItemManagement"] as GLMasterDataFormControl
    ).getValidationMessages();
  }
  getLineItemManagementMessages(lineItemManagement: string): string[] {
    return (
      this.controls["lineItemManagement"] as GLMasterDataFormControl
    ).getValidationMessages();
  }
  getBlockedForPostingValidationMessages(blockedForPosting: string): string[] {
    return (
      this.controls["blockedForPosting"] as GLMasterDataFormControl
    ).getValidationMessages();
  }
  getMarkedForDeletionValidationMessages(markedForDeletion: string): string[] {
    return (
      this.controls["markedForDeletion"] as GLMasterDataFormControl
    ).getValidationMessages();
  }
  getGroupAccountNumberValidationMessages(
    groupAccountNumber: string
  ): string[] {
    return (
      this.controls["groupAccountNumber"] as GLMasterDataFormControl
    ).getValidationMessages();
  }
  getTradingPartnerValidationMessages(tradingPartner: string): string[] {
    return (
      this.controls["tradingPartner"] as GLMasterDataFormControl
    ).getValidationMessages();
  }
  getSortKeyValidationMessages(sortKey: string): string[] {
    return (
      this.controls["sortKey"] as GLMasterDataFormControl
    ).getValidationMessages();
  }
  getAuthorizationGroupValidationMessages(
    authorizationGroup: string
  ): string[] {
    return (
      this.controls["authorizationGroup"] as GLMasterDataFormControl
    ).getValidationMessages();
  }
  getFieldStatusGroupValidationMessages(fieldStatusGroup: string): string[] {
    return (
      this.controls["fieldStatusGroup"] as GLMasterDataFormControl
    ).getValidationMessages();
  }
  getPostAutomaticallyOnlyValidationMessages(
    postAutomaticallyOnly: string
  ): string[] {
    return (
      this.controls["postAutomaticallyOnly"] as GLMasterDataFormControl
    ).getValidationMessages();
  }
  getRelevantToCashFlowValidationMessages(
    relevantToCashFlow: string
  ): string[] {
    return (
      this.controls["relevantToCashFlow"] as GLMasterDataFormControl
    ).getValidationMessages();
  }
  getHouseBankValidationMessages(houseBank: string): string[] {
    return (
      this.controls["houseBank"] as GLMasterDataFormControl
    ).getValidationMessages();
  }
  getHouseBankAccountIDValidationMessages(
    houseBankAccountID: string
  ): string[] {
    return (
      this.controls["houseBankAccountID"] as GLMasterDataFormControl
    ).getValidationMessages();
  }
  getInterestIndicatorValidationMessages(interestIndicator: string): string[] {
    return (
      this.controls["interestIndicator"] as GLMasterDataFormControl
    ).getValidationMessages();
  }

  getInterestCalculationFrequencyValidationMessages(
    interestCalculationFrequency: string
  ): string[] {
    return (
      this.controls["interestCalculationFrequency"] as GLMasterDataFormControl
    ).getValidationMessages();
  }
  getLastDateOfInterestCalculationValidationMessages(
    lastDateOfInterestCalculation: string
  ): string[] {
    return (
      this.controls["lastDateOfInterestCalculation"] as GLMasterDataFormControl
    ).getValidationMessages();
  }
  getKeyDateofLastInterestValidationMessages(
    keyDateofLastInterest: string
  ): string[] {
    return (
      this.controls["keyDateofLastInterest"] as GLMasterDataFormControl
    ).getValidationMessages();
  }
  getControllingAreaValidationMessages(controllingArea: string): string[] {
    return (
      this.controls["controllingArea"] as GLMasterDataFormControl
    ).getValidationMessages();
  }
  getCostElementValidationMessages(costElement: string): string[] {
    return (
      this.controls["costElement"] as GLMasterDataFormControl
    ).getValidationMessages();
  }
  getUnitOfMeasureValidationMessages(unitOfMeasure: string): string[] {
    return (
      this.controls["unitOfMeasure"] as GLMasterDataFormControl
    ).getValidationMessages();
  }

  getBusinessAreaValidationMessages(businessArea: string): string[] {
    return (
      this.controls["businessArea"] as GLMasterDataFormControl
    ).getValidationMessages();
  }

  getValuationGroupMessages(valuationGroup: string): string[] {
    return (
      this.controls["valuationGroup"] as GLMasterDataFormControl
    ).getValidationMessages();
  }
  getInflationKeyMessages(inflationKey: string): string[] {
    return (
      this.controls["inflationKey"] as GLMasterDataFormControl
    ).getValidationMessages();
  }

  getToleranceGroupMessages(toleranceGroup: string): string[] {
    return (
      this.controls["toleranceGroup"] as GLMasterDataFormControl
    ).getValidationMessages();
  }
  getplanningLevelValidationMessages(planningLevel: string): string[] {
    return (
      this.controls["planningLevel"] as GLMasterDataFormControl
    ).getValidationMessages();
  }
  getAccountManagedinExternalSystemValidationMessages(
    accountManagedinExternalSystem: string
  ): string[] {
    return (
      this.controls["accountManagedinExternalSystem"] as GLMasterDataFormControl
    ).getValidationMessages();
  }
  getSupplementAutomaticPostingsMessages(planningLevel: string): string[] {
    return (
      this.controls["supplementAutomaticPostings"] as GLMasterDataFormControl
    ).getValidationMessages();
  }

  getFormValidationMessages(): string[] {
    let messages: string[] = [];
    Object.values(this.controls).forEach((c) =>
      messages.push(...(c as GLMasterDataFormControl).getValidationMessages())
    );
    return messages;
  }
}

export class GLMasterDataAccountGroupFormControl extends FormControl {
  label: string;
  modelProperty: string;

  constructor(label: string, property: string, value: any, validator: any) {
    super(value, validator);
    this.label = label;
    this.modelProperty = property;
  }

  getValidationMessages() {
    let messages: string[] = [];
    if (this.errors) {
      for (let errorName in this.errors) {
        switch (errorName) {
          case "email":
            messages.push(`Please enter a valid ${this.label} address`);
            break;
          case "required":
            messages.push(`${this.label} is a required field `);
            break;
          case "minLength":
            messages.push(
              `${this.label} must be at least ${this.errors["minLength"].requiredLength} characters.`
            );
            break;
          case "maxLength":
            messages.push(
              `The ${this.label} must be ${this.errors["maxLength"].requiredLength} characters`
            );
            break;
          case "pattern":
            messages.push(
              `This ${this.label} must have a atleast one Number, a special character, uppercase and lowercase letter `
            );
            break;
        }
      }
    }
    return messages;
  }
}

export class GLMasterDataAccountGroupFormGroup extends FormGroup {
  constructor() {
    super({
      companyCode: new GLMasterDataAccountGroupFormControl(
        "Company Code",
        "companyCode",
        "",
        Validators.required
      ),
      chartOfAccounts: new GLMasterDataAccountGroupFormControl(
        "Chart of Accounts",
        "chartOfAccounts",
        "",
        Validators.required
      ),
      accountGroup: new GLMasterDataAccountGroupFormControl(
        "Account Group",
        "accountGroup",
        "",
        Validators.required
      ),
      description: new GLMasterDataAccountGroupFormControl(
        "Description",
        "description",
        "",
        Validators.required
      ),
    });
  }

  get glMasterDataAccountGroupFormControls(): GLMasterDataAccountGroupFormControl[] {
    return Object.keys(this.controls).map(
      (k) => this.controls[k] as GLMasterDataAccountGroupFormControl
    );
  }

  getCompanyCodeValidationMessages(companyCode: string): string[] {
    return (
      this.controls["companyCode"] as GLMasterDataAccountGroupFormControl
    ).getValidationMessages();
  }
  getChartOfAccountsValidationMessages(chartOfAccounts: string): string[] {
    return (
      this.controls["chartOfAccounts"] as GLMasterDataAccountGroupFormControl
    ).getValidationMessages();
  }
  getAccountGroupValidationMessages(accountGroup: string): string[] {
    return (
      this.controls["accountGroup"] as GLMasterDataAccountGroupFormControl
    ).getValidationMessages();
  }
  getDescriptionValidationMessages(description: string): string[] {
    return (
      this.controls["description"] as GLMasterDataAccountGroupFormControl
    ).getValidationMessages();
  }
  getFormValidationMessages(): string[] {
    let messages: string[] = [];
    Object.values(this.controls).forEach((c) =>
      messages.push(
        ...(c as GLMasterDataAccountGroupFormControl).getValidationMessages()
      )
    );
    return messages;
  }
}

export class GLMasterDataTaxCodeFormControl extends FormControl {
  label: string;
  modelProperty: string;

  constructor(label: string, property: string, value: any, validator: any) {
    super(value, validator);
    this.label = label;
    this.modelProperty = property;
  }

  getValidationMessages() {
    let messages: string[] = [];
    if (this.errors) {
      for (let errorName in this.errors) {
        switch (errorName) {
          case "email":
            messages.push(`Please enter a valid ${this.label} address`);
            break;
          case "required":
            messages.push(`${this.label} is a required field `);
            break;
          case "minLength":
            messages.push(
              `${this.label} must be at least ${this.errors["minLength"].requiredLength} characters.`
            );
            break;
          case "maxLength":
            messages.push(
              `The ${this.label} must be ${this.errors["maxLength"].requiredLength} characters`
            );
            break;
          case "pattern":
            messages.push(
              `This ${this.label} must have a atleast one Number, a special character, uppercase and lowercase letter `
            );
            break;
        }
      }
    }
    return messages;
  }
}

export class GLMasterDataTaxCodeFormGroup extends FormGroup {
  constructor() {
    super({
      companyCode: new GLMasterDataTaxCodeFormControl(
        "Company Code",
        "companyCode",
        "",
        Validators.required
      ),
      taxCode: new GLMasterDataTaxCodeFormControl(
        "Tax Code",
        "taxCode",
        "",
        Validators.required
      ),
      taxCodeDescription: new GLMasterDataTaxCodeFormControl(
        "Tax Code Description",
        "taxCodeDescription",
        "",
        Validators.required
      ),
      taxCodePercentage: new GLMasterDataTaxCodeFormControl(
        "Tax Code Percentage",
        "taxCodePercentage",
        "",
        Validators.required
      ),
    });
  }

  get glMasterDataTaxCodeFormControls(): GLMasterDataTaxCodeFormControl[] {
    return Object.keys(this.controls).map(
      (k) => this.controls[k] as GLMasterDataTaxCodeFormControl
    );
  }

  getCompanyCodeValidationMessages(companyCode: string): string[] {
    return (
      this.controls["companyCode"] as GLMasterDataTaxCodeFormControl
    ).getValidationMessages();
  }
  getTaxCodeValidationMessages(taxCode: string): string[] {
    return (
      this.controls["taxCode"] as GLMasterDataTaxCodeFormControl
    ).getValidationMessages();
  }
  getTaxCodeDescriptionValidationMessages(
    taxCodeDescription: string
  ): string[] {
    return (
      this.controls["taxCodeDescription"] as GLMasterDataTaxCodeFormControl
    ).getValidationMessages();
  }
  getTaxCodePercentageValidationMessages(taxCodePercentage: string): string[] {
    return (
      this.controls["taxCodePercentage"] as GLMasterDataTaxCodeFormControl
    ).getValidationMessages();
  }
  getFormValidationMessages(): string[] {
    let messages: string[] = [];
    Object.values(this.controls).forEach((c) =>
      messages.push(
        ...(c as GLMasterDataTaxCodeFormControl).getValidationMessages()
      )
    );
    return messages;
  }
}

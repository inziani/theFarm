import { FormControl, FormGroup, Validators } from '@angular/forms';

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
          case 'email':
            messages.push(`Please enter a valid ${this.label} address`);
            break;
          case 'required':
            messages.push(`${this.label} is a required field `);
            break;
          case 'minLength':
            messages.push(
              `${this.label} must be at least ${this.errors['minLength'].requiredLength} characters.`
            );
            break;
          case 'maxLength':
            messages.push(
              `The ${this.label} must be ${this.errors['maxLength'].requiredLength} characters`
            );
            break;
          case 'pattern':
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
        'Account Number',
        'accountNumber',
        '',
        Validators.compose([Validators.required])
      ),
      companyCode: new GLMasterDataFormControl(
        'Company Code',
        'companyCode',
        '',
        Validators.required
      ),
      chartOfAccounts: new GLMasterDataFormControl(
        'Chart of Accounts',
        'chartOfAccounts',
        '',
        Validators.required
      ),
      accountGroup: new GLMasterDataFormControl(
        'Account Group',
        'accountGroup',
        'GL01',
        Validators.required
      ),
      accountType: new GLMasterDataFormControl(
        'Account Type',
        'accountType',
        'General Ledger',
        Validators.required
      ),
      reconciliationAccountInput: new GLMasterDataFormControl(
        'Reconciliation Account',
        'reconciliationAccountInput',
        'False',
        Validators.required
      ),
      reconciliationAccountType: new GLMasterDataFormControl(
        'Reconciliation Account Type',
        'reconciliationAccountType',
        'General Ledger',
        Validators.required
      ),
      alternativeGLAccount: new GLMasterDataFormControl(
        'Alternative GL Account',
        'alternativeGLAccount',
        '0',
        Validators.required
      ),
      shortDescription: new GLMasterDataFormControl(
        'Short Description',
        'shortDescription',
        '',
        Validators.required
      ),
      longDescription: new GLMasterDataFormControl(
        'Long Description',
        'longDescription',
        '',
        Validators.required
      ),
      financialStatementAccount: new GLMasterDataFormControl(
        'Financial Statement Account',
        'Financial Statement Account',
        'Balance Sheet Account',
        Validators.required
      ),

      accountCurrency: new GLMasterDataFormControl(
        'Account Currency',
        'accountCurrency',
        'KSH',
        Validators.required
      ),
      onlyBalancesInLocalCurrency: new GLMasterDataFormControl(
        'Only Balances in Local currency',
        'onlyBalancesInLocalCurrency',
        'False',
        Validators.required
      ),
      exchangeRateKey: new GLMasterDataFormControl(
        'Exchange Rate Key',
        'exchangeRateKey',
        'ERK',
        Validators.required
      ),
      taxCategory: new GLMasterDataFormControl(
        'Tax Category',
        'taxCategory',
        'V0',
        Validators.required
      ),
      postingWithoutTaxAllowed: new GLMasterDataFormControl(
        'Posting without tax allowed',
        'postingWithoutTaxAllowed',
        'True',
        Validators.required
      ),
      openItemManagement: new GLMasterDataFormControl(
        'Open Item Management',
        'openItemManagement',
        'True',
        Validators.required
      ),
      lineItemManagement: new GLMasterDataFormControl(
        'Line Item Management',
        'lineItemManagement',
        'True',
        Validators.required
      ),
      blockedForPosting: new GLMasterDataFormControl(
        'Blocked for posting',
        'blockedForPosting',
        'False',
        Validators.required
      ),
      markedForDeletion: new GLMasterDataFormControl(
        'Marked for deletion',
        'markedForDeletion',
        'False',
        Validators.required
      ),
      groupAccountNumber: new GLMasterDataFormControl(
        'Group Account Number',
        'groupAccountNumber',
        '0',
        Validators.required
      ),
      tradingPartner: new GLMasterDataFormControl(
        'Trading partner',
        'tradingPartner',
        '0',
        Validators.required
      ),
      sortKey: new GLMasterDataFormControl(
        'Sort Key',
        'sortKey',
        'OO',
        Validators.required
      ),
      authorizationGroup: new GLMasterDataFormControl(
        'Authorization Group',
        'authorizationGroup',
        'GL00',
        Validators.required
      ),
      fieldStatusGroup: new GLMasterDataFormControl(
        'Field Status Group',
        'fieldStatusGroup',
        'FS00',
        Validators.required
      ),
      postAutomaticallyOnly: new GLMasterDataFormControl(
        'Post Automatically only',
        'postAutomaticallyOnly',
        'False',
        Validators.required
      ),
      relevantToCashFlow: new GLMasterDataFormControl(
        'Relevant to Cashflow',
        'relevantToCashFlow',
        'True',
        Validators.required
      ),
      houseBank: new GLMasterDataFormControl(
        'House Bank',
        'houseBank',
        'H100',
        Validators.required
      ),
      houseBankAccountID: new GLMasterDataFormControl(
        'House Bank Account ID',
        'houseBankAccountID',
        '0',
        Validators.required
      ),
      controllingArea: new GLMasterDataFormControl(
        'Controlling Area',
        'controllingArea',
        '',
        Validators.required
      ),
      costElement: new GLMasterDataFormControl(
        'Cost Element',
        'costElement',
        '0',
        Validators.required
      ),
      unitOfMeasure: new GLMasterDataFormControl(
        'Unit of Measure',
        'unitOfMeasure',
        'UOM',
        Validators.required
      ),
      businessArea: new GLMasterDataFormControl(
        'Business Area',
        'businessArea',
        '',
        Validators.required
      ),
      valuationGroup: new GLMasterDataFormControl(
        'Valuation Group',
        'valuationGroup',
        'VG00',
        Validators.required
      ),
      inflationKey: new GLMasterDataFormControl(
        'Inflation Key',
        'inflationKey',
        'IK',
        Validators.required
      ),
      toleranceGroup: new GLMasterDataFormControl(
        'Tolerance Group',
        'toleranceGroup',
        'TG00',
        Validators.required
      ),
      planningLevel: new GLMasterDataFormControl(
        'Planning Level',
        'planningLevel',
        '00',
        Validators.required
      ),
      accountManagedinExternalSystem: new GLMasterDataFormControl(
        'Account Managed in External System',
        'accountManagedinExternalSystem',
        'False',
        Validators.required
      ),
      supplementAutomaticPostings: new GLMasterDataFormControl(
        'Supplement Automatic Postings',
        'supplementAutomaticPostings',
        'True',
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
      this.controls['accountNumber'] as GLMasterDataFormControl
    ).getValidationMessages();
  }
  getCompanyCodeValidationMessages(companyCode: string): string[] {
    return (
      this.controls['companyCode'] as GLMasterDataFormControl
    ).getValidationMessages();
  }

  getChartOfAccountsValidationMessages(chartOfAccounts: string): string[] {
    return (
      this.controls['chartOfAccounts'] as GLMasterDataFormControl
    ).getValidationMessages();
  }
  getAccountGroupValidationMessages(accountGroup: string): string[] {
    return (
      this.controls['accountGroup'] as GLMasterDataFormControl
    ).getValidationMessages();
  }
  getAccountTypeValidationMessages(accountType: string): string[] {
    return (
      this.controls['accountType'] as GLMasterDataFormControl
    ).getValidationMessages();
  }

  getReconciliationAccountInputValidationMessages(
    reconciliationAccountInput: string
  ): string[] {
    return (
      this.controls['reconciliationAccountInput'] as GLMasterDataFormControl
    ).getValidationMessages();
  }
  getReconciliationAccountTypeValidationMessages(
    reconciliationAccountType: string
  ): string[] {
    return (
      this.controls['reconciliationAccountType'] as GLMasterDataFormControl
    ).getValidationMessages();
  }

  getAlternativeGLAccountValidationMessages(
    alternativeGLAccount: string
  ): string[] {
    return (
      this.controls['alternativeGLAccount'] as GLMasterDataFormControl
    ).getValidationMessages();
  }

  getShortDescriptionValidationMessages(shortDescription: string): string[] {
    return (
      this.controls['shortDescription'] as GLMasterDataFormControl
    ).getValidationMessages();
  }

  getLongDescriptionValidationMessages(longDescription: string): string[] {
    return (
      this.controls['longDescription'] as GLMasterDataFormControl
    ).getValidationMessages();
  }

  getFinancialStatementAccountValidationMessages(
    financialStatementAccount: string
  ): string[] {
    return (
      this.controls['financialStatementAccount'] as GLMasterDataFormControl
    ).getValidationMessages();
  }


  getAccountCurrencyValidationMessages(accountCurrency: string): string[] {
    return (
      this.controls['accountCurrency'] as GLMasterDataFormControl
    ).getValidationMessages();
  }
  getonlyBalancesInLocalCurrencyValidationMessages(
    onlyBalancesInLocalCurrency: string
  ): string[] {
    return (
      this.controls[onlyBalancesInLocalCurrency] as GLMasterDataFormControl
    ).getValidationMessages();
  }
  getExchangeRateKeyValidationMessages(exchangeRateKey: string): string[] {
    return (
      this.controls['exchangeRateKey'] as GLMasterDataFormControl
    ).getValidationMessages();
  }
  getTaxCategoryValidationMessages(taxCategory: string): string[] {
    return (
      this.controls['taxCategory'] as GLMasterDataFormControl
    ).getValidationMessages();
  }
  getPostingWithoutTaxAllowedValidationMessages(
    postingWithoutTaxAllowed: string
  ): string[] {
    return (
      this.controls['postingWithoutTaxAllowed'] as GLMasterDataFormControl
    ).getValidationMessages();
  }
  getOpenItemManagementValidationMessages(
    openItemManagement: string
  ): string[] {
    return (
      this.controls['openItemManagement'] as GLMasterDataFormControl
    ).getValidationMessages();
  }
  getLineItemManagementMessages(lineItemManagement: string): string[] {
    return (
      this.controls['lineItemManagement'] as GLMasterDataFormControl
    ).getValidationMessages();
  }
  getBlockedForPostingValidationMessages(blockedForPosting: string): string[] {
    return (
      this.controls['blockedForPosting'] as GLMasterDataFormControl
    ).getValidationMessages();
  }
  getMarkedForDeletionValidationMessages(markedForDeletion: string): string[] {
    return (
      this.controls['markedForDeletion'] as GLMasterDataFormControl
    ).getValidationMessages();
  }
  getGroupAccountNumberValidationMessages(
    groupAccountNumber: string
  ): string[] {
    return (
      this.controls['groupAccountNumber'] as GLMasterDataFormControl
    ).getValidationMessages();
  }
  getTradingPartnerValidationMessages(tradingPartner: string): string[] {
    return (
      this.controls['tradingPartner'] as GLMasterDataFormControl
    ).getValidationMessages();
  }
  getSortKeyValidationMessages(sortKey: string): string[] {
    return (
      this.controls['sortKey'] as GLMasterDataFormControl
    ).getValidationMessages();
  }
  getAuthorizationGroupValidationMessages(
    authorizationGroup: string
  ): string[] {
    return (
      this.controls['authorizationGroup'] as GLMasterDataFormControl
    ).getValidationMessages();
  }
  getFieldStatusGroupValidationMessages(fieldStatusGroup: string): string[] {
    return (
      this.controls['fieldStatusGroup'] as GLMasterDataFormControl
    ).getValidationMessages();
  }
  getPostAutomaticallyOnlyValidationMessages(
    postAutomaticallyOnly: string
  ): string[] {
    return (
      this.controls['postAutomaticallyOnly'] as GLMasterDataFormControl
    ).getValidationMessages();
  }
  getRelevantToCashFlowValidationMessages(
    relevantToCashFlow: string
  ): string[] {
    return (
      this.controls['relevantToCashFlow'] as GLMasterDataFormControl
    ).getValidationMessages();
  }
  getHouseBankValidationMessages(houseBank: string): string[] {
    return (
      this.controls['houseBank'] as GLMasterDataFormControl
    ).getValidationMessages();
  }
  getHouseBankAccountIDValidationMessages(
    houseBankAccountID: string
  ): string[] {
    return (
      this.controls['houseBankAccountID'] as GLMasterDataFormControl
    ).getValidationMessages();
  }
 
  getControllingAreaValidationMessages(controllingArea: string): string[] {
    return (
      this.controls['controllingArea'] as GLMasterDataFormControl
    ).getValidationMessages();
  }
  getCostElementValidationMessages(costElement: string): string[] {
    return (
      this.controls['costElement'] as GLMasterDataFormControl
    ).getValidationMessages();
  }
  getUnitOfMeasureValidationMessages(unitOfMeasure: string): string[] {
    return (
      this.controls['unitOfMeasure'] as GLMasterDataFormControl
    ).getValidationMessages();
  }

  getBusinessAreaValidationMessages(businessArea: string): string[] {
    return (
      this.controls['businessArea'] as GLMasterDataFormControl
    ).getValidationMessages();
  }

  getValuationGroupMessages(valuationGroup: string): string[] {
    return (
      this.controls['valuationGroup'] as GLMasterDataFormControl
    ).getValidationMessages();
  }
  getInflationKeyMessages(inflationKey: string): string[] {
    return (
      this.controls['inflationKey'] as GLMasterDataFormControl
    ).getValidationMessages();
  }

  getToleranceGroupMessages(toleranceGroup: string): string[] {
    return (
      this.controls['toleranceGroup'] as GLMasterDataFormControl
    ).getValidationMessages();
  }
  getplanningLevelValidationMessages(planningLevel: string): string[] {
    return (
      this.controls['planningLevel'] as GLMasterDataFormControl
    ).getValidationMessages();
  }
  getAccountManagedinExternalSystemValidationMessages(
    accountManagedinExternalSystem: string
  ): string[] {
    return (
      this.controls['accountManagedinExternalSystem'] as GLMasterDataFormControl
    ).getValidationMessages();
  }
  getSupplementAutomaticPostingsMessages(planningLevel: string): string[] {
    return (
      this.controls['supplementAutomaticPostings'] as GLMasterDataFormControl
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
          case 'email':
            messages.push(`Please enter a valid ${this.label} address`);
            break;
          case 'required':
            messages.push(`${this.label} is a required field `);
            break;
          case 'minLength':
            messages.push(
              `${this.label} must be at least ${this.errors['minLength'].requiredLength} characters.`
            );
            break;
          case 'maxLength':
            messages.push(
              `The ${this.label} must be ${this.errors['maxLength'].requiredLength} characters`
            );
            break;
          case 'pattern':
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
      accountGroup: new GLMasterDataAccountGroupFormControl(
        'Account Group',
        'accountGroup',
        '',
        Validators.compose([Validators.required, Validators.maxLength(4)])
      ),
      description: new GLMasterDataAccountGroupFormControl(
        'Description',
        'description',
        '',
        Validators.required
      ),
    });
  }

  get glMasterDataAccountGroupFormControls(): GLMasterDataAccountGroupFormControl[] {
    return Object.keys(this.controls).map(
      (k) => this.controls[k] as GLMasterDataAccountGroupFormControl
    );
  }

  getAccountGroupValidationMessages(accountGroup: string): string[] {
    return (
      this.controls['accountGroup'] as GLMasterDataAccountGroupFormControl
    ).getValidationMessages();
  }
  getDescriptionValidationMessages(description: string): string[] {
    return (
      this.controls['description'] as GLMasterDataAccountGroupFormControl
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
          case 'email':
            messages.push(`Please enter a valid ${this.label} address`);
            break;
          case 'required':
            messages.push(`${this.label} is a required field `);
            break;
          case 'minLength':
            messages.push(
              `${this.label} must be at least ${this.errors['minLength'].requiredLength} characters.`
            );
            break;
          case 'maxLength':
            messages.push(
              `The ${this.label} must be ${this.errors['maxLength'].requiredLength} characters`
            );
            break;
          case 'pattern':
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
      taxCode: new GLMasterDataTaxCodeFormControl(
        'Tax Code',
        'taxCode',
        '',
        Validators.compose([Validators.required, Validators.maxLength(2)])
      ),
      taxCodeDescription: new GLMasterDataTaxCodeFormControl(
        'Tax Code Description',
        'taxCodeDescription',
        '',
        Validators.required
      ),
      taxCodePercentage: new GLMasterDataTaxCodeFormControl(
        'Tax Code Percentage',
        'taxCodePercentage',
        '',
        Validators.required
      ),
    });
  }

  get glMasterDataTaxCodeFormControls(): GLMasterDataTaxCodeFormControl[] {
    return Object.keys(this.controls).map(
      (k) => this.controls[k] as GLMasterDataTaxCodeFormControl
    );
  }
  getTaxCodeValidationMessages(taxCode: string): string[] {
    return (
      this.controls['taxCode'] as GLMasterDataTaxCodeFormControl
    ).getValidationMessages();
  }
  getTaxCodeDescriptionValidationMessages(
    taxCodeDescription: string
  ): string[] {
    return (
      this.controls['taxCodeDescription'] as GLMasterDataTaxCodeFormControl
    ).getValidationMessages();
  }
  getTaxCodePercentageValidationMessages(taxCodePercentage: string): string[] {
    return (
      this.controls['taxCodePercentage'] as GLMasterDataTaxCodeFormControl
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

export class CustomFormControl extends FormControl {
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
          case 'email':
            messages.push(`Please enter a valid ${this.label} address`);
            break;
          case 'required':
            messages.push(`${this.label} is a required field `);
            break;
          case 'minLength':
            messages.push(
              `${this.label} must be at least ${this.errors['minLength'].requiredLength} characters.`
            );
            break;
          case 'maxLength':
            messages.push(
              `The ${this.label} must be ${this.errors['maxLength'].requiredLength} characters`
            );
            break;
          case 'pattern':
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

export class GLAccountGroupMasterData extends FormGroup {
  constructor() {
    super({
      accountGroupCode: new CustomFormControl(
        'accountGroup',
        'Account Group Code',
        '',
        Validators.compose([Validators.required, Validators.maxLength(4)])
      ),
      accountGroupDescription: new CustomFormControl(
        'description',
        'Account Group Description',
        '',
        Validators.required
      ),
    });
  }

  get accountGroupMasterDataFormControl(): CustomFormControl[] {
    return Object.keys(this.controls).map(
      (k) => this.controls[k] as CustomFormControl
    );
  }
  getAccountGroupCodeValidationMessages(accountGroup: string): string[] {
    return (
      this.controls['accountGroup'] as CustomFormControl
    ).getValidationMessages();
  }
  getaccountGroupDescriptionValidationMessages(description: string): string[] {
    return (
      this.controls['description'] as CustomFormControl
    ).getValidationMessages();
  }
  getFormValidationMessages(): string[] {
    let messages: string[] = [];
    Object.values(this.controls).forEach((c) =>
      messages.push(...(c as CustomFormControl).getValidationMessages())
    );
    return messages;
  }
}

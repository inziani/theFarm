import { FormControl, FormGroup, Validators } from "@angular/forms";


export class GLHeaderFormControl extends FormControl {

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
                        messages.push(`${this.label} must be at least ${this.errors['minLength'].requiredLength} characters.`);
                        break;
                    case "maxLength":
                        messages.push(`The ${this.label} must be ${this.errors['maxLength'].requiredLength} characters`);
                        break;
                    case "pattern":
                        messages.push(`This ${this.label} must have a atleast one Number, a special character, uppercase and lowercase letter `);
                        break;
                }

            }

        }
        return messages;
    }
}

export class GLHeaderFormGroup extends FormGroup {

    constructor() {
      super({

        chartOfAccounts: new GLHeaderFormControl("Chart of Accounts", "chartOfAccounts", "", Validators.required),
        companyCode: new GLHeaderFormControl("Company Code", "companyCode", "", Validators.required),
        accountNumber: new GLHeaderFormControl("Account Number", "accountNumber", "", Validators.required),
        accountType: new GLHeaderFormControl("Account Type", "accountType", "", Validators.required),
        accountGroup: new GLHeaderFormControl("Account Group", "accountGroup", "", Validators.required),
        pNlAccountType: new GLHeaderFormControl("Profit and Loss account type", "pNlAccountType", "", Validators.required),
        reconciliationAccountType: new GLHeaderFormControl("Reconciliation Account Type", "reconciliationAccountType", "", Validators.required),
        alternativeGLAccount: new GLHeaderFormControl("Alternative GL Account", "alternativeGLAccount", "", Validators.required),
        shortDescription: new GLHeaderFormControl("Short Description", "shortDescription", "", Validators.required),
        longDescription: new GLHeaderFormControl("Long Description", "longDescription", "", Validators.required),
        tradingPartner: new GLHeaderFormControl("Trading partner", "tradingPartner", "", Validators.required),
        groupAccountNumber: new GLHeaderFormControl("Group Account Number", "groupAccountNumber", "", Validators.required),
        blockedForPosting: new GLHeaderFormControl("Blocked for posting", "blockedForPosting", "", Validators.required),
        markedForDeletion: new GLHeaderFormControl("Marked for deletion", "markedForDeletion", "", Validators.required),
        accountCurrency: new GLHeaderFormControl("Account Currency", "accountCurrency", "", Validators.required),
        exchangeRateKey: new GLHeaderFormControl("Exchange Rate Key", "exchangeRateKey", "", Validators.required),
        taxCategory: new GLHeaderFormControl("Tax Category", "taxCategory", "", Validators.required),
        postingWithoutTaxAllowed: new GLHeaderFormControl("Posting without tax allowed", "postingWithoutTaxAllowed", "", Validators.required),
        openItemManagement: new GLHeaderFormControl("Open Item Management", "openItemManagement", "", Validators.required),
        sortKey: new GLHeaderFormControl("Sort Key", "sortKey", "", Validators.required),
        authorizationGroup: new GLHeaderFormControl("Authorization Group", "authorizationGroup", "", Validators.required),
        fieldStatusGroup: new GLHeaderFormControl("Field Status Group", "fieldStatusGroup", "", Validators.required),
        postAutomaticallyOnly: new GLHeaderFormControl("Post Automatically only", "postAutomaticallyOnly", "", Validators.required),
        relevantToCashFlow: new GLHeaderFormControl("Relevant to Cashflow", "relevantToCashFlow", "", Validators.required),
        houseBank: new GLHeaderFormControl("House Bank", "houseBank", "", Validators.required),
        houseBankAccountID: new GLHeaderFormControl("House Bank Account ID", "houseBankAccountID", "", Validators.required),
        interestIndicator: new GLHeaderFormControl("InterestIndicator", "interestIndicator", "", Validators.required),
        interestCalculationFrequency: new GLHeaderFormControl("Interest Calculation Frequency", "interestCalculationFrequency", "", Validators.required),
        lastDateOfInterestCalculation: new GLHeaderFormControl("Last day of interest calculation", "lastDateOfInterestCalculation", "", Validators.required),
        controllingArea: new GLHeaderFormControl("Controlling Area", "controllingArea", "", Validators.required),
        costElement: new GLHeaderFormControl("Cost Element", "costElement", "", Validators.required),
        unitOfMeasure: new GLHeaderFormControl("Unit of Measure", "unitOfMeasure", "", Validators.required),

        });
    }

    get glHeaderFormControls(): GLHeaderFormControl[] {
        return Object.keys(this.controls).map(k => this.controls[k] as GLHeaderFormControl);
    }

    getChartOfAccountsValidationMessages(chartOfAccounts: string): string[] {
        return (this.controls['chartOfAccounts'] as GLHeaderFormControl).getValidationMessages();
    }

    getCompanyCodeValidationMessages(companyCode: string): string[] {
        return (this.controls['companyCode'] as GLHeaderFormControl).getValidationMessages();
    }

    getAccountNumberValidationMessages(accountNumber: string): string[] {
        return (this.controls['accountNumber'] as GLHeaderFormControl).getValidationMessages();
    }

    getAccountTypeValidationMessages(accountType: string): string[] {
        return (this.controls['accountType'] as GLHeaderFormControl).getValidationMessages();
    }

    getPnLAccountTypeValidationMessages(pNlAccountType: string): string[] {
        return (this.controls['pNlAccountType'] as GLHeaderFormControl).getValidationMessages();
    }

   getAccountGroupValidationMessages(accountGroup: string): string[] {
        return (this.controls['accountGroup'] as GLHeaderFormControl).getValidationMessages();
    }

    getReconciliationAccountTypeValidationMessages(reconciliationAccountType: string): string[] {
        return (this.controls['reconciliationAccountType'] as GLHeaderFormControl).getValidationMessages();
    }

    getAlternativeGLAccountValidationMessages(alternativeGLAccount: string): string[] {
        return (this.controls['alternativeGLAccount'] as GLHeaderFormControl).getValidationMessages();
    }

    getShortDescriptionValidationMessages(shortDescription: string): string[] {
        return (this.controls['shortDescription'] as GLHeaderFormControl).getValidationMessages();
    }

    getLongDescriptionValidationMessages(longDescription: string): string[] {
        return (this.controls['longDescription'] as GLHeaderFormControl).getValidationMessages();
    }

    getGroupAccountNumberValidationMessages(groupAccountNumber: string): string[] {
        return (this.controls['groupAccountNumber'] as GLHeaderFormControl).getValidationMessages();
    }
     getBlockedForPostingValidationMessages(blockedForPosting: string): string[] {
        return (this.controls['blockedForPosting'] as GLHeaderFormControl).getValidationMessages();
     }
     getMarkedForDeletionValidationMessages(markedForDeletion: string): string[] {
        return (this.controls['markedForDeletion'] as GLHeaderFormControl).getValidationMessages();
     }
     getAccountCurrencyValidationMessages(accountCurrency: string): string[] {
        return (this.controls['accountCurrency'] as GLHeaderFormControl).getValidationMessages();
     }
     getExchangeRateKeyValidationMessages(exchangeRateKey: string): string[] {
        return (this.controls['exchangeRateKey'] as GLHeaderFormControl).getValidationMessages();
     }
     getTaxCategoryValidationMessages(taxCategory: string): string[] {
        return (this.controls['taxCategory'] as GLHeaderFormControl).getValidationMessages();
     }
     getPostingWithoutTaxAllowedValidationMessages(postingWithoutTaxAllowed: string): string[] {
        return (this.controls['postingWithoutTaxAllowed'] as GLHeaderFormControl).getValidationMessages();
     }
     getOpenItemManagementValidationMessages(openItemManagement: string): string[] {
        return (this.controls['openItemManagement'] as GLHeaderFormControl).getValidationMessages();
     }
     getSortKeyValidationMessages(sortKey: string): string[] {
        return (this.controls['sortKey'] as GLHeaderFormControl).getValidationMessages();
     }
     getAuthorizationGroupValidationMessages(authorizationGroup: string): string[] {
        return (this.controls['authorizationGroup'] as GLHeaderFormControl).getValidationMessages();
     }
     getfieldStatusGroupValidationMessages(fieldStatusGroup: string): string[] {
        return (this.controls['fieldStatusGroup'] as GLHeaderFormControl).getValidationMessages();
     }
     getPostAutomaticallyOnlyValidationMessages(postAutomaticallyOnly: string): string[] {
        return (this.controls['postAutomaticallyOnly'] as GLHeaderFormControl).getValidationMessages();
     }
     getRelevantToCashFlowValidationMessages(relevantToCashFlow: string): string[] {
        return (this.controls['relevantToCashFlow'] as GLHeaderFormControl).getValidationMessages();
     }
     getHouseBankValidationMessages(houseBank: string): string[] {
        return (this.controls['houseBank'] as GLHeaderFormControl).getValidationMessages();
     }
     getHouseBankAccountIDValidationMessages(houseBankAccountID: string): string[] {
        return (this.controls['houseBankAccountID'] as GLHeaderFormControl).getValidationMessages();
     }
     getInterestCalculationFrequencyValidationMessages(interestCalculationFrequency: string): string[] {
        return (this.controls['interestCalculationFrequency'] as GLHeaderFormControl).getValidationMessages();
     }
     getLastDateOfInterestCalculationValidationMessages(lastDateOfInterestCalculation: string): string[] {
        return (this.controls['lastDateOfInterestCalculation'] as GLHeaderFormControl).getValidationMessages();
     }
     getControllingAreaValidationMessages(controllingArea: string): string[] {
        return (this.controls['controllingArea'] as GLHeaderFormControl).getValidationMessages();
     }
     getCostElementValidationMessages(costElement: string): string[] {
        return (this.controls['costElement'] as GLHeaderFormControl).getValidationMessages();
     }
     getUnitOfMeasureValidationMessages(unitOfMeasure: string): string[] {
        return (this.controls['unitOfMeasure'] as GLHeaderFormControl).getValidationMessages();
     }
     getInterestIndicatorValidationMessages(interestIndicator: string): string[] {
        return (this.controls['interestIndicator'] as GLHeaderFormControl).getValidationMessages();
    }

    getFormValidationMessages(): string[] {
        let messages: string[] = [];
        Object.values(this.controls).forEach(c => messages.push(...(c as GLHeaderFormControl).getValidationMessages()));
        return messages;
    }
}

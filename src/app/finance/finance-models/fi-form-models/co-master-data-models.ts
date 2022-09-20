import { FormControl, FormGroup, Validators } from "@angular/forms";

export class CompanyMasterDataFormControl extends FormControl {

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

export class CompanyMasterDataFormGroup extends FormGroup {

    constructor() {
      super({

        company: new CompanyMasterDataFormControl("Company", "company", "", Validators.required),
        companyName: new CompanyMasterDataFormControl("Company Name", "companyName", "", Validators.required),
        street: new CompanyMasterDataFormControl("Stree", "street", "", Validators.required),
        postOfficeBox: new CompanyMasterDataFormControl("Post Office Box", "postOfficeBox", "", Validators.required),
        postalCode: new CompanyMasterDataFormControl("Postal Code", "postalCode", "", Validators.required),
        country: new CompanyMasterDataFormControl("Country", "country", "", Validators.required),
        language: new CompanyMasterDataFormControl("Language", "language", "", Validators.required),
        currency: new CompanyMasterDataFormControl("Currency", "currency", "", Validators.required),
        landLine: new CompanyMasterDataFormControl("Land Line", "landLine", "", Validators.required),
        mobileNumber: new CompanyMasterDataFormControl("Mobile Number", "mobileNumber", "", Validators.required),
        email: new CompanyMasterDataFormControl("Email", "email", "", Validators.required),

        });
    }

    get companyMasterDataFormControl(): CompanyMasterDataFormControl[] {
        return Object.keys(this.controls).map(k => this.controls[k] as CompanyMasterDataFormControl);
    }
    getCompanyNameValidationMessages(companyName: string): string[] {
        return (this.controls['companyName'] as CompanyMasterDataFormControl).getValidationMessages();
    }
    getCompanyValidationMessages(company: string): string[] {
        return (this.controls['company'] as CompanyMasterDataFormControl).getValidationMessages();
    }
    getStreetValidationMessages(street: string): string[] {
        return (this.controls['street'] as CompanyMasterDataFormControl).getValidationMessages();
    }
    getPostalCodeValidationMessages(postalCode: string): string[] {
        return (this.controls['postOfficeBox'] as CompanyMasterDataFormControl).getValidationMessages();
    }
    getPostOfficeBoxValidationMessages(postOfficeBox: string): string[] {
        return (this.controls['postOfficeBox'] as CompanyMasterDataFormControl).getValidationMessages();
    }
    getCountryValidationMessages(country: string): string[] {
        return (this.controls['country'] as CompanyMasterDataFormControl).getValidationMessages();
    }
    getlanguageValidationMessages(language: string): string[] {
        return (this.controls['language'] as CompanyMasterDataFormControl).getValidationMessages();
    }
    getCurrencyValidationMessages(currency: string): string[] {
        return (this.controls['currency'] as CompanyMasterDataFormControl).getValidationMessages();
    }
    getLandLineValidationMessages(landLine: string): string[] {
        return (this.controls['landLine'] as CompanyMasterDataFormControl).getValidationMessages();
    }
    getMobileNumberValidationMessages(mobileNumber: string): string[] {
        return (this.controls['mobileNumber'] as CompanyMasterDataFormControl).getValidationMessages();
    }
    getEmailValidationMessages(email: string): string[] {
        return (this.controls['email'] as CompanyMasterDataFormControl).getValidationMessages();
    }


    getFormValidationMessages(): string[] {
        let messages: string[] = [];
        Object.values(this.controls).forEach(c => messages.push(...(c as CompanyMasterDataFormControl).getValidationMessages()));
        return messages;
    }
}


export class CompanyCodeMasterDataFormControl extends FormControl {

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

export class CompanyCodeMasterDataFormGroup extends FormGroup {

    constructor() {
      super({

        companyCode: new CompanyCodeMasterDataFormControl("Company Code Code","companyCode", "", Validators.required ),
        companyCodeName: new CompanyCodeMasterDataFormControl("Company Code Name", "companyCodeName","", Validators.required),
        company: new CompanyCodeMasterDataFormControl("Company", "company", "", Validators.required),

        });
    }

    get companyCodeMasterDataFormControl(): CompanyCodeMasterDataFormControl[] {
        return Object.keys(this.controls).map(k => this.controls[k] as CompanyCodeMasterDataFormControl);
    }

    getCompanyCodeValidationMessages(companyCode: string): string[] {
        return (this.controls['companyCode'] as CompanyCodeMasterDataFormControl).getValidationMessages();
    }

    getCompanyCodeNameValidationMessages(companyCodeName: string): string[] {
        return (this.controls['companyCodeName'] as CompanyCodeMasterDataFormControl).getValidationMessages();
    }
    getCompanyValidationMessages(company: string): string[] {
        return (this.controls['company'] as CompanyCodeMasterDataFormControl).getValidationMessages();
    }
    getFormValidationMessages(): string[] {
        let messages: string[] = [];
        Object.values(this.controls).forEach(c => messages.push(...(c as CompanyCodeMasterDataFormControl).getValidationMessages()));
        return messages;
    }
}

export class ChartOfAccountsMasterDataFormControl extends FormControl {

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

export class ChartOfAccountsMasterDataFormGroup extends FormGroup {

    constructor() {
      super({

        coaCode: new ChartOfAccountsMasterDataFormControl("Chart of Accounts Code","coaCode", "", Validators.required ),
        companyCode: new ChartOfAccountsMasterDataFormControl("Company Code","companyCode", "", Validators.required ),
        chartOfAccountsName: new ChartOfAccountsMasterDataFormControl("Chart Of Accounts Name","chartOfAccountsName", "", Validators.required ),
        language: new ChartOfAccountsMasterDataFormControl("Language", "language", "", Validators.required),
        lengthAccNumber: new ChartOfAccountsMasterDataFormControl("Length of Account Number", "lengthAccNumber", "", Validators.required),
        blockedForPosting: new ChartOfAccountsMasterDataFormControl("Blocked For Posting", "blockedForPosting", "", Validators.required),

        });
    }

    get ChartOfAccountsMasterDataFormControl(): ChartOfAccountsMasterDataFormControl[] {
        return Object.keys(this.controls).map(k => this.controls[k] as ChartOfAccountsMasterDataFormControl);
    }
    getCoaCodeValidationMessages(coaCode: string): string[] {
        return (this.controls['coaCode'] as ChartOfAccountsMasterDataFormControl).getValidationMessages();
    }

    getCompanyCodeValidationMessages(companyCode: string): string[] {
        return (this.controls['companyCode'] as ChartOfAccountsMasterDataFormControl).getValidationMessages();
    }
    getChartOfAccountsNameValidationMessages(chartOfAccountsName: string): string[] {
        return (this.controls['chartOfAccountsName'] as ChartOfAccountsMasterDataFormControl).getValidationMessages();
    }
    getlanguageValidationMessages(language: string): string[] {
        return (this.controls['language'] as ChartOfAccountsMasterDataFormControl).getValidationMessages();
    }
    getlengthAccNumberValidationMessages(lengthAccNumber: string): string[] {
        return (this.controls['lengthAccNumber'] as ChartOfAccountsMasterDataFormControl).getValidationMessages();
    }
    getBlockedForPostingValidationMessages(blockedForPosting: string): string[] {
        return (this.controls['blockedForPosting'] as ChartOfAccountsMasterDataFormControl).getValidationMessages();
    }

    getFormValidationMessages(): string[] {
        let messages: string[] = [];
        Object.values(this.controls).forEach(c => messages.push(...(c as ChartOfAccountsMasterDataFormControl).getValidationMessages()));
        return messages;
    }
}


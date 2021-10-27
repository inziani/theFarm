import { FormControl, FormGroup, RequiredValidator, Validators } from "@angular/forms";

export class LoginFormControl extends FormControl {

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
                        messages.push(` This ${this.label} is required`);
                        break;
                    case "minLength":
                        messages.push(`A ${this.label} must be atleast ${this.errors['minLength'].requiredLength} characters`);
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

export class LoginFormGroup extends FormGroup {

    constructor() {
        super({
            email: new LoginFormControl("Email", "email", "", Validators.compose(
                [
                    Validators.required,
                    Validators.email,
                ]
            )),
            password: new LoginFormControl("Password", "password", "", Validators.required),
        });
    }


    get loginFormControls(): LoginFormControl[] {
        return Object.keys(this.controls).map(k => this.controls[k] as LoginFormControl);
    }

    getEmailValidationMessages(email: string): string[] {
        return (this.controls['email'] as LoginFormControl).getValidationMessages();
    }

    getPasswordValidationMessages(password: string): string[] {
        return (this.controls['password'] as LoginFormControl).getValidationMessages();
    }

    getFormValidationMessages(): string[] {
        let messages: string[] = [];
        Object.values(this.controls).forEach(c => messages.push(...(c as LoginFormControl).getValidationMessages()));
        return messages;
    }
}

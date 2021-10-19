import { FormControl, FormGroup, RequiredValidator, Validators } from "@angular/forms";
import { ObjectUnsubscribedError } from "rxjs";



export class AuthenticationFormControl extends FormControl {

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
                    case "required":
                        messages.push(`You must enter a ${this.label}`);
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

export class AuthenticationFormGroup extends FormGroup {

    constructor() {
        super({
            email: new AuthenticationFormControl("Email", "email", "", Validators.required),
            password: new AuthenticationFormControl("Password", "password", "",
                Validators.compose([
                    Validators.required,
                    Validators.pattern("/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/"),
                    Validators.minLength(8),
                    Validators.maxLength(12)

                ]))
        });

    }

    get auhenticationControls(): AuthenticationFormControl[] {
        return Object.keys(this.controls).map(k => this.controls[k] as AuthenticationFormControl);
    }

    getValidationMessages(name: string): string[] {
        return (this.controls['name'] as AuthenticationFormControl).getValidationMessages();
    }

    getFormValidationMessages(): string[] {
        let messages: string[] = [];
        Object.values(this.controls).forEach(c => messages.push(...(c as AuthenticationFormControl).getValidationMessages()));
        return messages;




    }


}

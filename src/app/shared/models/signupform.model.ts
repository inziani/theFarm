import { FormControl, FormGroup, Validators } from "@angular/forms";


export class SignUpFormControl extends FormControl {

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

export class SignUpFormGroup extends FormGroup {

    constructor() {
        super({


            firstName: new SignUpFormControl("First Name", "firstName", "", Validators.required),
            lastName: new SignUpFormControl("Last Name", "lastName", "", Validators.required),
            birthday: new SignUpFormControl("Birthday", "birthday", "", Validators.required),
            phoneNumber: new SignUpFormControl("Phone Number", "phoneNumber", "", Validators.required),
            username: new SignUpFormControl("Username", "username", "", Validators.required),
            email: new SignUpFormControl("Email", "email", "", Validators.compose([
                Validators.required,
                Validators.email
            ])),
            gender: new SignUpFormControl("Gender", "gender", "", Validators.required),
            city: new SignUpFormControl("City", "city", "", Validators.required),
            password: new SignUpFormControl("Password", "Password", "",
                Validators.compose([
                    Validators.required,
                    // Validators.pattern("/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/"),
                    Validators.minLength(8),
                    Validators.maxLength(20)
                ])),
            confirmPassword: new SignUpFormControl("Confirm Password", "confirmPassword", "",
                Validators.compose([
                    Validators.required,
                    // Validators.pattern("/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/"),
                    Validators.minLength(8),
                    Validators.maxLength(20)
                ]))

        });
    }

    get signUpFormControls(): SignUpFormControl[] {
        return Object.keys(this.controls).map(k => this.controls[k] as SignUpFormControl);
    }


    getfirstNameValidationMessages(firstName: string): string[] {
        return (this.controls['firstName'] as SignUpFormControl).getValidationMessages();
    }

    getlastNameValidationMessages(lastName: string): string[] {
        return (this.controls['lastName'] as SignUpFormControl).getValidationMessages();
    }

    getBirthDayValidationMessages(birthday: string): string[] {
        return (this.controls['birthday'] as SignUpFormControl).getValidationMessages();
    }

    getPhoneNumberValidationMessages(phoneNumber: string): string[] {
        return (this.controls['phoneNumber'] as SignUpFormControl).getValidationMessages();
    }

    getUserNameValidationMessages(username: string): string[] {
        return (this.controls['username'] as SignUpFormControl).getValidationMessages();
    }

    getEmailValidationMessages(email: string): string[] {
        return (this.controls['email'] as SignUpFormControl).getValidationMessages();
    }

    getGenderValidationMessages(gender: string): string[] {
        return (this.controls['gender'] as SignUpFormControl).getValidationMessages();
    }

    getCityValidationMessages(city: string): string[] {
        return (this.controls['city'] as SignUpFormControl).getValidationMessages();
    }

    getPasswordValidationMessages(password: string): string[] {
        return (this.controls['password'] as SignUpFormControl).getValidationMessages();
    }

    getConfirmPasswordValidationMessages(confirmPassword: string): string[] {
        return (this.controls['confirmPassword'] as SignUpFormControl).getValidationMessages();
    }

    getFormValidationMessages(): string[] {
        let messages: string[] = [];
        Object.values(this.controls).forEach(c => messages.push(...(c as SignUpFormControl).getValidationMessages()));
        return messages;
    }
}

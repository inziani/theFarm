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


            first_name: new SignUpFormControl("First Name", "first_name", "", Validators.required),
            last_name: new SignUpFormControl("Last Name", "last_name", "", Validators.required),
            date_of_birth: new SignUpFormControl("Birthday", "date_of_birth", "", Validators.required),
            phone_number: new SignUpFormControl("Phone Number", "phone_number", "", Validators.required),
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


    getfirstNameValidationMessages(first_name: string): string[] {
        return (this.controls['first_name'] as SignUpFormControl).getValidationMessages();
    }

    getlastNameValidationMessages(last_name: string): string[] {
        return (this.controls['last_name'] as SignUpFormControl).getValidationMessages();
    }

    getBirthDayValidationMessages(date_of_birth: string): string[] {
        return (this.controls['date_of_birth'] as SignUpFormControl).getValidationMessages();
    }

    getPhoneNumberValidationMessages(phone_number: string): string[] {
        return (this.controls['phone_number'] as SignUpFormControl).getValidationMessages();
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

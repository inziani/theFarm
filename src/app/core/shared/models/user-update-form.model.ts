
import { FormControl, FormGroup, Validators } from "@angular/forms";


export class UserUpdateFormControl extends FormControl{


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

export class UserUpdateFormGroup extends FormGroup {

    constructor() {
        super({


            first_name: new UserUpdateFormControl("First Name", "first_name", "", Validators.required,),
            last_name: new UserUpdateFormControl("Last Name", "last_name", "", Validators.required),
            date_of_birth: new UserUpdateFormControl("Birthday", "birthday", {value:'', disabled: true }, Validators.required),
            phone_number: new UserUpdateFormControl("Phone Number", "phoneNumber", "", Validators.required),
            username: new UserUpdateFormControl("Username", "username", "", Validators.required),
            email: new UserUpdateFormControl("Email", "email", "", Validators.compose([

              Validators.required,
              Validators.email,

            ])),
            gender: new UserUpdateFormControl("Gender", "gender", {value:'', disabled: true }, Validators.required),
            city: new UserUpdateFormControl("City", "city", "", Validators.required),


        });
    }

    get signUpFormControls(): UserUpdateFormControl[] {
        return Object.keys(this.controls).map(k => this.controls[k] as UserUpdateFormControl);
    }


    getfirstNameValidationMessages(first_name: string): string[] {
        return (this.controls['first_name'] as UserUpdateFormControl).getValidationMessages();
    }

    getlastNameValidationMessages(last_name: string): string[] {
        return (this.controls['last_name'] as UserUpdateFormControl).getValidationMessages();
    }

    getBirthDayValidationMessages(date_of_birth: string): string[] {
        return (this.controls['date_of_birth'] as UserUpdateFormControl).getValidationMessages();
    }

    getPhoneNumberValidationMessages(phone_number: string): string[] {
        return (this.controls['phone_number'] as UserUpdateFormControl).getValidationMessages();
    }

    getUserNameValidationMessages(username: string): string[] {
        return (this.controls['username'] as UserUpdateFormControl).getValidationMessages();
    }

    getEmailValidationMessages(email: string): string[] {
        return (this.controls['email'] as UserUpdateFormControl).getValidationMessages();
    }

    getGenderValidationMessages(gender: string): string[] {
        return (this.controls['gender'] as UserUpdateFormControl).getValidationMessages();
    }

    getCityValidationMessages(city: string): string[] {
        return (this.controls['city'] as UserUpdateFormControl).getValidationMessages();
    }


    getFormValidationMessages(): string[] {
        let messages: string[] = [];
        Object.values(this.controls).forEach(c => messages.push(...(c as UserUpdateFormControl).getValidationMessages()));
        return messages;
    }
}

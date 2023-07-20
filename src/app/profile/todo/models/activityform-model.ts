import { FormControl, FormGroup, Validators } from "@angular/forms";


export class ActivityFormControl extends FormControl{

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

export class ActivityFormGroup extends FormGroup{

   constructor() {
     super({
       id: new ActivityFormControl(
         'Id',
         'id',
         '',
         Validators.compose([])
       ),

       title: new ActivityFormControl(
         'Title',
         'title',
         '',
         Validators.compose([Validators.required, Validators.maxLength(32)])
       ),
       description: new ActivityFormControl(
         'Description',
         'description',
         '',
         Validators.compose([Validators.required, Validators.maxLength(132)])
       ),
       status: new ActivityFormControl(
         'Status',
         'status',
         '',
         Validators.required
       ),
       activity_category: new ActivityFormControl(
         'Activity Category',
         'activity_category',
         '',
         Validators.required
       ),
     });
    }

    get ActivityFormControl(): ActivityFormControl[] {
        return Object.keys(this.controls).map(k => this.controls[k] as ActivityFormControl);
    }

    getTitleNameValidationMessages(title: string): string[] {
        return (this.controls['title'] as ActivityFormControl).getValidationMessages();
    }

    getDescriptionValidationMessages(description: string): string[] {
        return (this.controls['description'] as ActivityFormControl).getValidationMessages();
    }

    getStatusValidationMessages(status: string): string[] {
        return (this.controls['status'] as ActivityFormControl).getValidationMessages();
    }

    getActivityCategoryValidationMessages(activity_category: string): string[] {
        return (this.controls['activity_category'] as ActivityFormControl).getValidationMessages();
    }

    getFormValidationMessages(): string[] {
        let messages: string[] = [];
        Object.values(this.controls).forEach(c => messages.push(...(c as ActivityFormControl).getValidationMessages()));
        return messages;
    }


}

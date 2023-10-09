import { FormControl, FormGroup, Validators } from '@angular/forms';

export class ActivityCategoryFormControl extends FormControl {
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

export class ActivityCategoryFormGroup extends FormGroup {
  constructor() {
    super({
      id: new ActivityCategoryFormControl(
        'Id',
        'id',
        '',
        Validators.compose([])
      ),
      title: new ActivityCategoryFormControl(
        'Title',
        'title',
        '',
        Validators.compose([Validators.required, Validators.maxLength(32)])
      ),
      description: new ActivityCategoryFormControl(
        'Description',
        'description',
        '',
        Validators.compose([Validators.required, Validators.maxLength(132)])
      ),
      category: new ActivityCategoryFormControl(
        'Category',
        'category',
        '',
        Validators.required
      ),
    });
  }

  get ActivityCategoryFormControl(): ActivityCategoryFormControl[] {
    return Object.keys(this.controls).map(
      (k) => this.controls[k] as ActivityCategoryFormControl
    );
  }

  getTitleNameValidationMessages(title: string): string[] {
    return (
      this.controls['title'] as ActivityCategoryFormControl
    ).getValidationMessages();
  }

  getDescriptionValidationMessages(description: string): string[] {
    return (
      this.controls['description'] as ActivityCategoryFormControl
    ).getValidationMessages();
  }

  getActivityCategoryValidationMessages(category: string): string[] {
    return (
      this.controls['category'] as ActivityCategoryFormControl
    ).getValidationMessages();
  }

  getFormValidationMessages(): string[] {
    let messages: string[] = [];
    Object.values(this.controls).forEach((c) =>
      messages.push(
        ...(c as ActivityCategoryFormControl).getValidationMessages()
      )
    );
    return messages;
  }
}

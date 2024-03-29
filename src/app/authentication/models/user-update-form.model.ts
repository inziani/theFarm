
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
      id: new UserUpdateFormControl(
        'id',
        'id',
        '',
        Validators.required
      ),

      username: new UserUpdateFormControl(
        'Username',
        'username',
        '',
        Validators.required
      ),
      email: new UserUpdateFormControl(
        'Email',
        'email',
        '',
        Validators.compose([Validators.required, Validators.email])
      ),
      first_name: new UserUpdateFormControl(
        'First Name',
        'first_name',
        '',
        Validators.required
      ),
      middle_name: new UserUpdateFormControl(
        'Middle Name',
        'middle_name',
        '',
        Validators.required
      ),
      last_name: new UserUpdateFormControl(
        'Last Name',
        'last_name',
        '',
        Validators.required
      ),
      gender: new UserUpdateFormControl(
        'Gender',
        'gender',
        '',
        Validators.required
      ),
      phone_number: new UserUpdateFormControl(
        'Phone Number',
        'phoneNumber',
        '',
        Validators.required
      ),
      date_of_birth: new UserUpdateFormControl(
        'Birthday',
        'birthday',
        '',
        Validators.required
      ),
      city: new UserUpdateFormControl('City', 'city', '', Validators.required),
      country: new UserUpdateFormControl(
        'Country',
        'country',
        '',
        Validators.required
      ),
      password: new UserUpdateFormControl(
        'Password',
        'Password',
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
        ])
      ),
      confirmPassword: new UserUpdateFormControl(
        'Confirm Password',
        'confirmPassword',
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
        ])
      ),
      is_active: new EmployeeIDInformationFormControl(
        'Active',
        'is_active',
        '',
        Validators.required
      ),
      is_superuser: new EmployeeIDInformationFormControl(
        'Superuser',
        'is_superuser',
        '',
        Validators.required
      ),
      is_staff: new UserUpdateFormControl(
        'Staff',
        'is_staff',
        '',
        Validators.required
      ),
      staffType: new UserUpdateFormControl(
        'Staff Type',
        'staffType',
        '',
        Validators.required
      ),
    });
  }

  get userUpdateFormControl(): UserUpdateFormControl[] {
    return Object.keys(this.controls).map(
      (k) => this.controls[k] as UserUpdateFormControl
    );
  }
  getUserNameValidationMessages(username: string): string[] {
    return (
      this.controls['username'] as UserUpdateFormControl
    ).getValidationMessages();
  }
  getEmailValidationMessages(email: string): string[] {
    return (
      this.controls['email'] as UserUpdateFormControl
    ).getValidationMessages();
  }
  getfirstNameValidationMessages(first_name: string): string[] {
    return (
      this.controls['first_name'] as UserUpdateFormControl
    ).getValidationMessages();
  }
  getMiddleNameValidationMessages(middle_name: string): string[] {
    return (
      this.controls['middle_name'] as UserUpdateFormControl
    ).getValidationMessages();
  }
  getlastNameValidationMessages(last_name: string): string[] {
    return (
      this.controls['last_name'] as UserUpdateFormControl
    ).getValidationMessages();
  }
  getGenderValidationMessages(gender: string): string[] {
    return (
      this.controls['gender'] as UserUpdateFormControl
    ).getValidationMessages();
  }
  getBirthDayValidationMessages(date_of_birth: string): string[] {
    return (
      this.controls['date_of_birth'] as UserUpdateFormControl
    ).getValidationMessages();
  }
  getPhoneNumberValidationMessages(phone_number: string): string[] {
    return (
      this.controls['phone_number'] as UserUpdateFormControl
    ).getValidationMessages();
  }

  getCityValidationMessages(city: string): string[] {
    return (
      this.controls['city'] as UserUpdateFormControl
    ).getValidationMessages();
  }
  getCountryValidationMessages(country: string): string[] {
    return (
      this.controls['country'] as UserUpdateFormControl
    ).getValidationMessages();
  }
  getPasswordValidationMessages(password: string): string[] {
    return (
      this.controls['password'] as UserUpdateFormControl
    ).getValidationMessages();
  }

  getConfirmPasswordValidationMessages(confirmPassword: string): string[] {
    return (
      this.controls['confirmPassword'] as UserUpdateFormControl
    ).getValidationMessages();
  }
  getIsActiveValidationMessages(is_active: string): string[] {
    return (
      this.controls['is_active'] as EmployeeIDInformationFormControl
    ).getValidationMessages();
  }
  getIsSuperuserValidationMessages(is_superuser: string): string[] {
    return (
      this.controls['is_superuser'] as EmployeeIDInformationFormControl
    ).getValidationMessages();
  }
  getIsStaffValidationMessages(is_staff: string): string[] {
    return (
      this.controls['is_staff'] as UserUpdateFormControl
    ).getValidationMessages();
  }
  getStaffTypeValidationMessages(staffType: string): string[] {
    return (
      this.controls['staffType'] as UserUpdateFormControl
    ).getValidationMessages();
  }

  getFormValidationMessages(): string[] {
    let messages: string[] = [];
    Object.values(this.controls).forEach((c) =>
      messages.push(...(c as UserUpdateFormControl).getValidationMessages())
    );
    return messages;
  }
}

export class UserBioUpdateFormControl extends FormControl {

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

export class UserBioUserUpdateFormGroup extends FormGroup {
  constructor() {
    super({
      education_bio: new UserBioUpdateFormControl(
        'Education Bio',
        'education_bio',
        '',
        Validators.required
      ),
      professional_bio: new UserBioUpdateFormControl(
        'Professional Bio',
        'professional_bio',
        '',
        Validators.required
      ),
    });
  }

  get userBioUpdateFormControl(): UserBioUpdateFormControl[] {
    return Object.keys(this.controls).map(
      (k) => this.controls[k] as UserBioUpdateFormControl
    );
  }

  getEducationBioValidationMessages(education_bio: string): string[] {
    return (
      this.controls['education_bio'] as UserBioUpdateFormControl
    ).getValidationMessages();
  }

  getProfessionalBioValidationMessages(professional_bio: string): string[] {
    return (
      this.controls['professional_bio'] as UserBioUpdateFormControl
    ).getValidationMessages();
  }

  getFormValidationMessages(): string[] {
    let messages: string[] = [];
    Object.values(this.controls).forEach((c) =>
      messages.push(...(c as UserBioUpdateFormControl).getValidationMessages())
    );
    return messages;
  }
}


export class UserHobbiesUserUpdateFormGroup extends FormGroup {
  constructor() {
    super({
      professional_hobbies: new UserBioUpdateFormControl(
        'Professional Hobbies',
        'professional_hobbies',
        '',
        Validators.required
      ),
      personal_hobbies: new UserBioUpdateFormControl(
        'Personal Hobbies',
        'personal_hobbies',
        '',
        Validators.required
      ),
      social_hobbies: new UserBioUpdateFormControl(
        'Social Hobbies',
        'social_hobbies',
        '',
        Validators.required
      ),
    });
  }

  get userHobbiesUpdateFormControl(): UserBioUpdateFormControl[] {
    return Object.keys(this.controls).map(
      (k) => this.controls[k] as UserBioUpdateFormControl
    );
  }

  getProfessionalHobbiesValidationMessages(
    professional_hobbies: string
  ): string[] {
    return (
      this.controls['professional_hobbies'] as UserBioUpdateFormControl
    ).getValidationMessages();
  }

  getPersonalHobbiesValidationMessages(personal_hobbies: string): string[] {
    return (
      this.controls['personal_hobbies'] as UserBioUpdateFormControl
    ).getValidationMessages();
  }

  getSocialHobbiesValidationMessages(social_hobbies: string): string[] {
    return (
      this.controls['social_hobbies'] as UserBioUpdateFormControl
    ).getValidationMessages();
  }

  getFormValidationMessages(): string[] {
    let messages: string[] = [];
    Object.values(this.controls).forEach((c) =>
      messages.push(...(c as UserBioUpdateFormControl).getValidationMessages())
    );
    return messages;
  }
}

export class UserProfilePictureUpdateFormControl extends FormControl {
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


export class UserProfilePictureUpdateFormGroup extends FormGroup {
  constructor() {
    super({
      profile_pic: new UserProfilePictureUpdateFormControl(
        'Profile Picture',
        'profile_pic',
        '',
        Validators.required
      ),
    });
  }

  getProfilePicValidationMessages(profile_pic: string): string[] {
    return (
      this.controls['profile_pic'] as UserProfilePictureUpdateFormControl
    ).getValidationMessages();
  }
  getFormValidationMessages(): string[] {
    let messages: string[] = [];
    Object.values(this.controls).forEach((c) =>
      messages.push(
        ...(c as UserProfilePictureUpdateFormControl).getValidationMessages()
      )
    );
    return messages;
  }
}

export class EmployeeIDInformationFormControl extends FormControl{

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

export class EmployeeIDInformationFormGroup extends FormGroup {

    constructor() {
        super({
            identificationDocument: new EmployeeIDInformationFormControl("Identification Document", "identificationDocument", "", Validators.required),
            identificationNumber: new EmployeeIDInformationFormControl("Identification Number", "identificationNumber", "", Validators.required),
            taxNumber: new EmployeeIDInformationFormControl("Tax Number", "taxNumber", "", Validators.required,),
            startDate: new EmployeeIDInformationFormControl("Start Date", "startDate", "", Validators.required),
            endDate: new EmployeeIDInformationFormControl("End Date", "endDate", "", Validators.required),
        });
    }

    get employeeIDInformationFormControl(): EmployeeIDInformationFormControl[] {
        return Object.keys(this.controls).map(k => this.controls[k] as EmployeeIDInformationFormControl);
    }

    getIdentificationDocumentValidationMessages(identificationDocument: string): string[] {
        return (this.controls['identificationDocument'] as EmployeeIDInformationFormControl).getValidationMessages();
    }
    getIdentificationNumberValidationMessages(identificationNumber: string): string[] {
        return (this.controls['identificationNumber'] as EmployeeIDInformationFormControl).getValidationMessages();
    }

    getTaxNumberValidationMessages(taxNumber: string): string[] {
        return (this.controls['taxNumber'] as EmployeeIDInformationFormControl).getValidationMessages();
    }

    getStartDateValidationMessages(startDate: string): string[] {
        return (this.controls['startDate'] as EmployeeIDInformationFormControl).getValidationMessages();
    }

    getEndDateValidationMessages(endDate: string): string[] {
        return (this.controls['endDate'] as EmployeeIDInformationFormControl).getValidationMessages();
    }

    getFormValidationMessages(): string[] {
        let messages: string[] = [];
        Object.values(this.controls).forEach(c => messages.push(...(c as EmployeeIDInformationFormControl).getValidationMessages()));
        return messages;
    }
}

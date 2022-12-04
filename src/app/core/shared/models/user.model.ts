import { FormControl } from "@angular/forms";

export class User{

  constructor(
    public id: number,
    public username: string,
    public email: string,
    public first_name: string,
    public middle_name: string,
    public last_name: string,
    public phone_number: string,
    public date_of_birth: string,
    public gender: string,
    public city: string,
    public country: string,
    public is_active: boolean,
    public is_superuser: boolean,
    public is_staff: boolean,
    public date_joined: Date,
    public password: string,

  ){

  }
}

export class UserProfile{

  constructor(
    public bio: string,
    public hobbies: string,
    public profile_pic: string,
    public create_at: Date,
    public updated_at: Date

  ) {

  }
}

export class JwTToken{

  constructor(
    public refresh: string,
    public access: string

  ) {

  }
}

export class UserEmployeePersonalData {
  constructor(
      public id: number,
      public username: string,
      public email: string,
      public first_name: string,
      public middle_name: string,
      public last_name: string,
      public phone_number: string,
      public date_of_birth: string,
      public gender: string,
      public city: string,
      public country: string,
      public is_active: boolean,
      public is_superuser: boolean,
      public is_staff: boolean,
      public date_joined: Date,
      public password: string,
      public identificationDocument: string,
      public taxNumber: string,
      public startDate: Date,
      public endDate: Date
  ) {}
};

export class EmployeeIDInformation {

  constructor(
    public identificationDocument: string,
    public IdentificationNumber: string,
    public taxNumber: string,
    public startDate: Date,
    public endDate: Date) {

    }
  };

export type EmployeePersonalFormData = {
  name: FormControl<string>;
  username: FormControl<string>;
  email: FormControl<string>;
  first_name: FormControl<string>;
  middle_name: FormControl<string>;
  last_name: FormControl <string>;
  phone_number: FormControl<string>;
  date_of_birth: FormControl<string>;
  gender: FormControl<string>;
  city: FormControl<string>;
  country: FormControl<string>;
  is_active: FormControl<boolean>;
  is_superuser: FormControl<boolean>;
  is_staff: FormControl<boolean>;
  date_joined: FormControl<Date>;
  password: FormControl<string>;
};

export type EmployeeIdFormData = {
  /**
   * Identification Document
   */
  identificationDocument: FormControl<string>;
  /**
   * Identification Number of Identification Document
   */
  taxNumber: FormControl<string>;
  /**
   * Employment Start Date
   */
  startDate: FormControl<string>;
  /**
   *Employment end date
   */
  endDate: FormControl<Date>;
};




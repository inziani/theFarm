import { FormControl } from '@angular/forms';

export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  phone_number: string;
  date_of_birth: string;
  gender: string;
  city: string;
  country: string;
  is_active: boolean;
  is_superuser: boolean;
  is_staff: boolean;
  staffType: string;
  date_joined: Date;
}

export interface UserProfile {
  user: number;
  education_bio: string;
  professional_bio: string;
  professional_hobbies: string;
  personal_hobbies: string;
  social_hobbies: string;
  profile_pic: { url: string };
  create_at: Date;
  updated_at: Date;
}

export interface UserEmployeePersonalData {
  id: number;
  username: string;
  email: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  phone_number: string;
  date_of_birth: string;
  gender: string;
  city: string;
  country: string;
  is_active: boolean;
  is_superuser: boolean;
  is_staff: boolean;
  date_joined: Date;
  password: string;
  identificationDocument: string;
  taxNumber: string;
  startDate: Date;
  endDate: Date;
}

export interface EmployeeIDInformation {
  identificationDocument: string;
  IdentificationNumber: string;
  taxNumber: string;
  startDate: Date;
  endDate: Date;
}

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

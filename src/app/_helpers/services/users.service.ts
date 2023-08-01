import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';

import { environment } from '@environments/environment';

import {
  Observable,
  Subscription,
  BehaviorSubject,
  map,
  shareReplay,
} from 'rxjs';

import { UserInterface } from '../../shared/interfaces/users-interface';
import {
  EmployeeIDInformation,
  User,
  UserProfile,
} from '@app/features/human-resources/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  public isAuthenticated: boolean = false;
  public user!: number;
  public userList!: User[];
  public loggedInUser!: any;
  private userAction = new BehaviorSubject<string>('');
  public data: Observable<string> = this.userAction.asObservable();

  private _$userProfileDataSource = new BehaviorSubject<UserProfile[]>([]);
  public userProfileData: Observable<UserProfile[]> =
    this._$userProfileDataSource.asObservable();

  private userSubscription!: Subscription;
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      accept: 'application/json',
    }),
  };

  constructor(private _http: HttpClient) {}

  ngOnInit() {}

  public sendData(data: string) {
    this.userAction.next(data);
  }

  // Get user listing;
  public getUsersListing(): Observable<UserInterface[]> {
    return this._http.get<UserInterface[]>(`${environment.apiUrl}/users/`);
  }

  // User creation

  public addUser(
    username: string,
    email: string,
    first_name: string,
    middle_name: string,
    last_name: string,
    phone_number: string,
    date_of_birth: string,
    gender: string,
    city: string,
    country: string,
    is_active: boolean,
    is_superuser: boolean,
    is_staff: boolean
  ): Observable<User> {
    return this._http.post<User>(
      `${environment.apiUrl}/users/`,
      {
        username,
        email,
        first_name,
        middle_name,
        last_name,
        phone_number,
        date_of_birth,
        gender,
        city,
        country,
        is_active,
        is_superuser,
        is_staff,
      },
      this.httpOptions
    );
  }

  public addUserId(
    identificationDocument: string,
    IdentificationNumber: string,
    taxNumber: string,
    startDate: Date,
    endDate: Date
  ): Observable<EmployeeIDInformation> {
    return this._http.post<EmployeeIDInformation>(
      `${environment.apiUrl}/empIDInfo/`,
      {
        identificationDocument,
        IdentificationNumber,
        taxNumber,
        startDate,
        endDate,
      },
      this.httpOptions
    );
  }

  public fetchUsers(): Observable<User[]> {
    return this._http
      .get<User[]>(`${environment.apiUrl}/users/`, this.httpOptions)
      .pipe(shareReplay());
  }
  public fetchSingleUser(id: number): Observable<User> {
    return this._http.get<User>(
      `${environment.apiUrl}/users/` + id + '/',
      this.httpOptions
    );
  }

  public editUserInformation(
    id: number,
    username: string,
    email: string,
    first_name: string,
    middle_name: string,
    last_name: string,
    phone_number: string,
    date_of_birth: string,
    gender: string,
    city: string,
    country: string,
    is_active: boolean,
    is_superuser: boolean,
    is_staff: boolean,
    staffType: string
  ): Observable<User> {
    return this._http.patch<User>(
      `${environment.apiUrl}/users/` + id + '/',
      {
        username,
        email,
        first_name,
        middle_name,
        last_name,
        phone_number,
        date_of_birth,
        gender,
        city,
        country,
        is_active,
        is_superuser,
        is_staff,
      },
      this.httpOptions
    );
  }

  public deleteSingleUser(id: number): Observable<User> {
    return this._http.delete<User>(
      `${environment.apiUrl}/users/` + id + '/',
      this.httpOptions
    );
  }

  public fetchUserProfiles(): Observable<UserProfile[]> {
    return this._http
      .get<UserProfile[]>(
        `${environment.apiUrl}/user-profile`,
        this.httpOptions
      )
      .pipe(
        map((userProfiles: UserProfile[]) => {
          this._$userProfileDataSource.next(userProfiles);
          return userProfiles;
        }),
        shareReplay()
      );
  }

  public fetchSingleUserProfile(user: number): Observable<any> {
    return this._http.get<any>(
      `${environment.apiUrl}/user-profile/` + user + '/',
      this.httpOptions
    );
  }
  // This method will edit all the user profiles that are sitting on one table in Django. T
  public editSingleUserProfile(
    user: number,
    education_bio: string,
    professional_bio: string,
    professional_hobbies: string,
    personal_hobbies: string,
    social_hobbies: string
  ): Observable<UserProfile> {
    return this._http.patch<UserProfile>(
      `${environment.apiUrl}/user-profile/` + user + '/',
      {
        education_bio,
        professional_bio,
        professional_hobbies,
        personal_hobbies,
        social_hobbies,
      },

      this.httpOptions
    );
  }

  //  Update profile picture code

  public uploadProfilePicture(
    id: number,
    profile_pic: File
  ): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('profile_pic', profile_pic, profile_pic.name);
    return this._http.put<any>(
      `${environment.apiUrl}/user-profile/` + id + '/',
      formData
    );
  }

  public oneEditUserProfilePersonalInformation(
    first_name: string,
    last_name: string,
    date_of_birth: Date,
    phone_number: number,
    username: string,
    gender: string,
    city: string,
    email: string,
    password: string
  ): Observable<User> {
    return this._http.post<User>(
      `${environment.apiUrl}/register/`,
      JSON.stringify({
        first_name,
        last_name,
        date_of_birth,
        phone_number,
        username,
        gender,
        city,
        email,
        password,
      }),
      this.httpOptions
    );
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}

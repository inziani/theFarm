import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { OnInit, OnDestroy } from '@angular/core';
import { environment } from '@environments/environment';

import { Observable, Subscription, catchError, throwError, BehaviorSubject } from 'rxjs';



import { UserInterface } from '../shared/interfaces/users-interface';
import { User, UserProfile } from '@app/core/shared/models/user.model';

import { AuthenticationService } from './authentication.service';
import { RestDataSource } from '@app/core/shared/data/rest.datasource';
import { MatDialog } from '@angular/material/dialog';


@Injectable({
  providedIn: 'root',
})
export class UsersService {
  public isAuthenticated: boolean = false;
  public user!: number;
  public userList!: User[];
  public loggedInUser!: any;
  public currentLoggedInUser!: User[];
  private userAction = new BehaviorSubject<string>('');
  public data: Observable<string> = this.userAction.asObservable();
  private userSubscription!: Subscription;
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      accept: 'application/json',
    }),
  };

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService,
    private dataSource: RestDataSource
  ) {}

  ngOnInit() {
    this.userSubscription = this.authenticationService.currentUser$.subscribe(
      (user) => {
        this.isAuthenticated = !!user;
        this.user = user;
        this.loggedInUser = this.fetchUsers().subscribe((users) => {
          this.userList = users;
          this.loggedInUser = this.userList.filter(
            (person: User) => person.id === this.user
          );
          this.currentLoggedInUser = this.loggedInUser;
        });
      }
    );
  }

  public sendData(data: string) {
    this.userAction.next(data);
  }

  // Get user listing;
  public getUsersListing(): Observable<UserInterface[]> {
    return this.http.get<UserInterface[]>(`${environment.apiUrl}/users/`);
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
    is_staff: boolean,
    password: string
  ): Observable<User> {
    return this.http.post<User>(
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
        password,
      },
      this.httpOptions
    );
  }

  public fetchUsers(): Observable<User[]> {
    return this.http.get<User[]>(
      `${environment.apiUrl}/users/`,
      this.httpOptions
    );
  }
  public fetchSingleUser(id: number): Observable<User> {
    return this.http.get<User>(
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
    is_staff: boolean
  ): Observable<User> {
    return this.http.patch<User>(
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
    return this.http.delete<User>(
      `${environment.apiUrl}/users/` + id + '/',
      this.httpOptions
    );
  }

  public fetchUserProfiles(): Observable<UserProfile[]> {
    return this.http.get<UserProfile[]>(
      `${environment.apiUrl}/user-profile`,
      this.httpOptions
    );
  }

  // Admin User Edit
  // Admin User Deletion

  // Delete Users

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}

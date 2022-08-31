import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { OnInit, OnDestroy } from '@angular/core';
import { environment } from '@environments/environment';

import { Observable, Subscription, catchError, throwError } from 'rxjs';



import { UserInterface } from '../shared/interfaces/users-interface';
import { User } from '@app/core/shared/models/user.model';

import { AuthenticationService } from './authentication.service';
import { RestDataSource } from '@app/core/shared/data/rest.datasource';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public isAuthenticated: boolean = false;
  public user!: number;
  public userList!: User[];
  public loggedInUser!: any;
  public currentLoggedInUser!: User[];


  private userSubscription!: Subscription;



  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService,
    private dataSource: RestDataSource,)
  { }

  ngOnInit() {

    this.userSubscription = this.authenticationService.currentUser$.subscribe(
      user => {
        this.isAuthenticated = !!user;
        this.user = user;
        this.loggedInUser = this.dataSource.fetchUsers().subscribe(users => {
          this.userList = users;
          this.loggedInUser = this.userList.filter((person: User) => person.id === this.user);
          this.currentLoggedInUser = this.loggedInUser;
        })

      });

  }

  // Get user listing;
  public getUsersListing(): Observable<UserInterface[]> {
    return this.http.get<UserInterface[]>(`${environment.apiUrl}/users/`).pipe(
      catchError(this.handleError));;
  }
  // Register new users

  // Delete Users

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  private handleError(error: HttpErrorResponse) {
  let errorMessage = '';
  if (error.status === 0) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error occurred:', error.error);

  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong.
    console.error(
      `Backend returned code ${error.status}, body was: `, error.error);
    errorMessage = `Backend returned code ${error.status}, body was: `, error.error;
  }
  // Return an observable with a user-facing error message.
    errorMessage = `Backend returned code ${error.status}, body was: `, error.error;
  return throwError(() => new Error(errorMessage));
}

}

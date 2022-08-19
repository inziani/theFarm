import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { OnInit, OnDestroy } from '@angular/core';
import { environment } from '@environments/environment';

import { Observable, Subscription } from 'rxjs';



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
    return this.http.get<UserInterface[]>(`${environment.apiUrl}/users/`);
  }
  // Register new users

  // Delete Users

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

}

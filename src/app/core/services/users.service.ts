import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { OnInit, OnDestroy } from '@angular/core';
import { environment } from '@environments/environment';


import { Observable, Subscription } from 'rxjs';
import { UserInterface } from '../shared/interfaces/users-interface';
import { AuthenticatedUser } from '../shared/models/user.model';
import { AuthenticationService } from './authentication.service';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public loggedInUser!: AuthenticatedUser;
  public decodedLoggedInUser!: AuthenticatedUser;
  public displayUser!: AuthenticatedUser;
  private userSubscription!: Subscription;


  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService)
  { }

  ngOnInit() {
    this.userSubscription = this.authenticationService.currentUser$.subscribe(user => {
      let test = JSON.parse(JSON.stringify(user));
      this.loggedInUser = test.access;
      console.log('User in UserService - ', this.loggedInUser);
      let testString = test.access;


      let decodeUser = jwtDecode(test);
      let final = JSON.stringify(decodeUser);
      let finalParsed = JSON.parse(final);
      this.decodedLoggedInUser = new AuthenticatedUser(finalParsed.tokenType, finalParsed.expiryDate, finalParsed.iatDate, finalParsed.token, finalParsed.userId);
      // this.displayUser = this.decodedLoggedInUser;
      console.log('decoded user on service - ', this.decodedLoggedInUser);
    })

  }

  public getUsersListing(): Observable<UserInterface[]> {
    return this.http.get<UserInterface[]>(`${environment.apiUrl}/users/`);
  }

  public get finalLoggedInUser() {
    return this.decodedLoggedInUser;
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();

  }





}

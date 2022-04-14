import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { OnInit, OnDestroy } from '@angular/core';
import { environment } from '@environments/environment';

import { Observable, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';


import { UserInterface } from '../shared/interfaces/users-interface';
import { AuthenticatedUser } from '../shared/models/user.model';
import { AuthenticationService } from './authentication.service';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UsersService {


  private userSubscription!: Subscription;



  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService)
  { }

  ngOnInit() {

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

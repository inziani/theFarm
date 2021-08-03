import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/shared/models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  // This service is for getting the Tokens once the user logs in to enable the user retrieve and post data on the Django API

  // http options used for making API calls

  private httpOptions!: {};

  // The JWT token for authorisation

  public token!: string;

  // The token expiration date

  public tokenExpires!: Date;

  // The emailof the logged in user

  public email!: string;

  //  Error messages received from the login attempts

  public errors!: [];

  constructor(private http: HttpClient) {

    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    };

    // The http.post() request below gets an auth token from djangorestframework_simplejwt endpoint

  // login(user){
  //   return this.http.post('api/token/',JSON.stringify(user), this.httpOptions).
  //   subscribe(data => {
  //     this.updateData(data['token']);
  //   },

  //   err =>{
  //     this.errors = err['errors'];
  //   }
  //   ));
  // }

}

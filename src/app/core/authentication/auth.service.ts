import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap,shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

// import { NgForm } from '@angular/forms';
import { User } from '..//../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject!: BehaviorSubject<User>;
  public currentUser!: Observable<User>;

  constructor(private http: HttpClient) { }

  onUserLogIn(email: string, password: string){
    // HTTP call for user log in
    // return this.http.post<User>('api/token/', {email, password}).pipe(shareReplay());
    return this.http.post<User>(`${environment.apiUrl}/api/token/`, { email, password}).pipe(tap());

  }
}

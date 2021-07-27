import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

//   // http options used formaking API calls
//   private httpOptions: any;

//   //  the JWT token
//   public jwttoken!: string;

//   //  Token expiry date

//   public token_expires!: Date;

//   // Credentials of the userlogged in

//   public email!: string;

//   // Error messages received from any login attempts

//   public errors: any = [];

//   constructor(private http: HttpClient) {
//     this.httpOptions = {
//       headers: new HttpHeaders({'Content-Type': 'application/jason'})
//     };
//    }

//   //  Use http.post() to get an auth token from djangorestframework-jwt endpoint
//   public login(user: User){
//     this.http.post('api-token-auth/', JSON.stringify(user), this.httpOptions).subscribe(
//       userData =>{
//         this.updateData(userData['jwttoken']);
//       },
//       err =>{
//         this.errors = err['error'];
//       }
//     );
//   }

//   public refreshToken() {
//   this.http.post('/api-token-refresh/', JSON.stringify({token: this.jwttoken}), this.httpOptions).subscribe(
//     userData => {
//       this.updateData(userData['jwttoken']);
//     },
//     err => {
//       this.errors = err['error'];
//     }
//   );
// }
//   public logout(){
//     this.jwttoken = null;
//     this.token_expires = null;
//     this.email = null;
//   }

//   private updateData(jwttoken){
//     this.jwttoken = jwttoken;
//     this.errors = [];

//     // decode the token to read the username and expiration timestamp
//     const token_parts = this.jwttoken.split(/\./);
//     const token_decoded = JSON.parse(window.atob(token_parts[1]));
//     this.token_expires = new Date(token_decoded.exp * 1000);
//     this.email = token_decoded.email;
//   }
 }



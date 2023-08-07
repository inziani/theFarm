import { Injectable, OnInit } from '@angular/core';
import { selectJwtToken } from '../store/selectors/authentication.selector';

export interface UserLogin {
  email: string;
  password: string;
}

export interface JwTAuthenticationResponseInterface {
  refresh: string;
  access: string;
}

export interface JWTDecodedTokenInterface {
  token_type: string;
  exp: number;
  iat: number;
  jti: string;
  user_id: number;
}

export interface SignUpCredentials {
  first_name: string;
  last_name: string;
  date_of_birth: Date;
  phone_number: number;
  username: string;
  gender: string;
  city: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// @Injectable()
// export class AuthenticatedUser implements OnInit {
//   constructor() {}

//   ngOnInit(): void {
//     // this._store.select(selectJwtToken).subscribe({
//     //   next: (token) => {
//     //     console.log('Store Token - ', token);
//     //     const jwtDecodeToken = this.jwtHelper.decodeToken(
//     //       token.access
//     //     ) as JWTDecodedTokenInterface;
//     //     console.log('jwtDecodeToken-', jwtDecodeToken);
//     //   },
//     //   error: (err) => (this.errorMessage = err),
//     //   complete: () => console.info('Completed Token Fetching'),
//     // });
//   }
// }

export interface UserInterface{

  "id": number,
  "first_name":string,
  "last_name": string,
  "date_of_birth": string,
  "phone_number": string,
  "username": string,
  "email": string,
  "gender": string,
  "city": string

}

export interface UserProfileInterface{

   "url": string,
    "user": string,
    "bio": string,
    "hobbies": string,
    "profile_pic": string,
    "create_at": string,
    "updated_at": string

}

export interface Gender {
    value: string;
    viewValue: string;
}

export interface StaffType {
  value: string;
  viewValue: string;
}

// export interface SignUpResponse {
//   email: string,
//   username: string
// }

// export interface UserLogin {
//   email: string;
//   password: string;
// }

// export interface JwTAuthenticationResponseInterface {
//   refresh: string,
//   access: string
// }

// export interface JWTDecodedTokenInterface {
//   token_type: string;
//   exp: number;
//   iat: number;
//   jti: string;
//   user_id: number;
// }






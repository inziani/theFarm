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

export interface SignUpResponse {
  email: string,
  username: string
}
export interface LoginResponse{
  tokenType: string,
  expiryDate: number,
  iatDate: number,
  accessToken: string
  userId: number

}

export interface JwTAuthenticationResponseInterface {
  refresh: string,
  access: string
}


export interface UserCredentials {
    email: string;
    password: string;
}







export interface UserLogin {
  email: string;
  password: string;
}

export interface JwTAuthenticationResponseInterface {
  refresh: string,
  access: string
}

export interface JWTDecodedTokenInterface {
  token_type: string;
  exp: number;
  iat: number;
  jti: string;
  user_id: number;
}

export  interface SignUpCredentials {

         first_name: string,
         last_name: string,
         date_of_birth: Date,
         phone_number: number,
         username: string,
         gender: string,
         city: string,
         email: string,
         password: string,
         confirmPassword: string
}

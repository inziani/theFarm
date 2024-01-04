export interface UserLogin {
  email: string;
  password: string;
}

export class AutoLoginUser {
  constructor(
    private email: string,
    private id: string,
    private jwtToken: string,
    private jwtTokenExpirationDate: string
  ) { }

  get userEmail() {
    return this.email;
  }

  get userId() {
    return this.id;
  }

  get userJwtTokenExpirationDate() {
    return this.jwtTokenExpirationDate;
  }

  get userjwtToken() {
    return this.jwtToken;
  }
}

export interface JwTAuthenticationResponseInterface {
  refresh: string;
  access: string;
}

export class JWTDecodedTokenInterface {
  constructor(
    public token_type: string,
    public exp: number,
    public iat: number,
    public jti: string,
    public user_id: number
  ) {}

  get tokenType() {
    return this.token_type;
  }

  get expiryDate() {
    return this.exp;
  }

  get IssueDate() {
    return this.iat;
  }

  get replayJTIDate() {
    return this.jti;
  }

  get userId() {
    return this.user_id;
  }
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

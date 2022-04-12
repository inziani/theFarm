export class User{

  constructor(
    public id: number,
    public first_name: string,
    public last_name: string,
    public date_of_birth: string,
    public phone_number: string,
    public username: string,
    public email: string,
    public gender: string,
    public city: string,

  ){

  }
}

export class UserProfile{

  constructor(
    public bio: string,
    public hobbies: string,
    public profile_pic: string,
    public create_at: Date,
    public updated_at: Date

  ) {

  }
}

// export class AuthenticateUser{
//   constructor(

//     public id: number,
//     public first_name: string,
//     public last_name: string,
//     public username: string,
//     public email: string,
//     public _token?: string,
//     public _tokenRefresh?: string
//   ) {

//   }
// }

export class AuthenticatedUser {

  constructor(

  tokenType: string,
  expiryDate: number,
  iatDate: number,
  token: string,
  userId: number


  ) {

  }
}

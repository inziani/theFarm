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
    public city: string

    // private _token: string,
    // private _tokenExpirationDate: Date
  ){

  }
  // get token(){
  //   if (!this._tokenExpirationDate || new Date()> this._tokenExpirationDate){
  //     return null;
  //   }
  //   return this._token
  // }
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

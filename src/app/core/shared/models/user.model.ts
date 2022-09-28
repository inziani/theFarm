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

export class JwTToken{

  constructor(
    public refresh: string,
    public access: string

  ) {

  }
}


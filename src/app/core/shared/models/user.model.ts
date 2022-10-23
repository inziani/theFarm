export class User{

  constructor(
    public id: number,
    public username: string,
    public email: string,
    public first_name: string,
    public middle_name: string,
    public last_name: string,
    public phone_number: string,
    public date_of_birth: string,
    public gender: string,
    public city: string,
    public country: string,
    public is_active: boolean,
    public is_superuser: boolean,
    public is_staff: boolean,
    public date_joined: Date,
    public password: string,

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




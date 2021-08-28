export class User{
  constructor(
    public id: number,
    public username: string,
    public first_name: string,
    public middle_name:string,
    public last_name: string,
    public email: string,
    private _token: string,
    private _tokenExpirationDate: Date
  ){

  }
  get token(){
    if (!this._tokenExpirationDate || new Date()> this._tokenExpirationDate){
      return null;
    }
    return this._token
  }

}

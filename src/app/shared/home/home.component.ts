import { Component, OnInit } from '@angular/core';

import { first } from 'rxjs/operators';

import { AuthenticationService } from '@app/core/services/authentication.service';
import { UsersService } from '@app/core/services/users.service';
import { RestDataSource } from '../data/rest.datasource';
import { User } from '../models/user.model';

import jwtDecode, { JwtPayload } from 'jwt-decode';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loading: boolean = false;
  users: User[]= [];
  decodedPayloadToken!: any;
  decodedPayloadTokenRefresh!: any;
  payloadToken!: any;
  payloadTokenRefresh!: any;
  public tokenExpiry!: Date; 
  public userId!: number;
  public userName!: any;

  

  constructor(
    private usersService: UsersService,
    private dataSource: RestDataSource,
    private authenticationService: AuthenticationService,
    ) { }

  ngOnInit(): void {
    this.loading = true;
    this.dataSource.getAllUsers().pipe(first()).subscribe(usersData =>{
      this.loading = false;
      this.users = usersData;
    });
    this.decodedPayloadToken = this.dataSource.jwtPayloadData(this.dataSource.authToken);
    this.decodedPayloadTokenRefresh = this.dataSource.jwtPayloadData(this.dataSource.authTokenRefresh);
    this.payloadToken = this.dataSource.authToken;
    this.payloadTokenRefresh = this.dataSource.authTokenRefresh;
    this.userId = this.dataSource.userId;
    this.tokenExpiry = this.dataSource.expiryDate;
    

  }


}

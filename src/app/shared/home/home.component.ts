import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { UsersService } from '@app/core/services/users.service';
import { first } from 'rxjs/operators';
import { RestDataSource } from '../data/rest.datasource';
import { User } from '../models/user.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loading: boolean = false;
  users: User[]= [];
  user!: string;


  constructor(
    private usersService: UsersService,
    private dataSource: RestDataSource,
    private authenticationService: AuthenticationService
    ) { }

  ngOnInit(): void {
    this.loading = true;
    this.dataSource.getAllUsers().pipe(first()).subscribe(users =>{
      this.loading = false;
      this.users = users;
      this.user = this.authenticationService.userDetails;
    });
  }

}

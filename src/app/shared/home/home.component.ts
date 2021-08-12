import { Component, OnInit } from '@angular/core';
import { UsersService } from '@app/core/services/users.service';
import { first } from 'rxjs/operators';
import { User } from '../models/user.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loading: boolean = false;
  users: User[]= [];


  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.loading = true;
    this.usersService.getAllUsers().pipe(first()).subscribe(users =>{
      this.loading = false;
      this.users = users;
    });
  }

}

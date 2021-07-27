import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersService } from 'src/app/core/services/users.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user!: User;
  isLoginMode = true;

  onSwitchLoggedStatus(){
    this.isLoginMode = !this.isLoginMode;
  }

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.user = new User('', '');
  }

  userLogIn(userLogInForm: User){
    this.usersService

  };

}

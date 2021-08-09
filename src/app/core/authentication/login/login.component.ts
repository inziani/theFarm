import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from '../auth.service';

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

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.user = new User('', '');
  }

  logIn(userLogInForm: NgForm){
    console.log(userLogInForm.value);
    userLogInForm.reset();

  };

}

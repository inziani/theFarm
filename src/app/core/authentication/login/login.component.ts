import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';




import { User } from 'src/app/shared/models/user.model';
import { AuthenticationService} from '@app/core/services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit { 

  isLoginMode = true;
  isLoading = false;
  error: string = '';
  token!: string;

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;

  }
 
  constructor(
    public authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router
    ) { 
    
    }

  ngOnInit(): void {
    
  }

   logIn(form: NgForm){
    if(!form.valid){
      return
    }
    const email= form.value.email;
    const password = form.value.password;
    this.isLoading = true;
    this.authenticationService.onLogin(email, password)
    .subscribe(
      success => {
        // console.log(success);
        if(success){
          // console.log(success)
          this.router.navigate(['home']);
        }
      },
      error => {
      this.error = 'Login Unsuccessful! Try again'
      this.isLoading = false;
      console.log(this.error);
    }
    );
    form.reset();
  };

}

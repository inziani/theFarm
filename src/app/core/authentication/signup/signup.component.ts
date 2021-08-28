import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '@app/core/services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  isLoading = false;
  error!: string | null;

  constructor(
    private autheticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  signUp(form: NgForm){
    if(!form.valid){
      return
    }
    this.isLoading = true;
    const username = form.value.username;
    const email = form.value.email;
    const password = form.value.email;
    this.autheticationService.onUserSignOn(username, email, password).subscribe(signUpData =>{
      console.log(signUpData);
      this.isLoading= false;
      this.router.navigate(['/login']);
    }, 
    errorMessage =>{
      console.log(errorMessage);
      this.error = errorMessage;
      this.isLoading=false;
    })
    form.reset();
  }

}

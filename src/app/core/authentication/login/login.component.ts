import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';


import { User } from 'src/app/shared/models/user.model';
import { AuthenticationService} from '@app/core/services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit { 
  loading: boolean = false;
 
  

  constructor(
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router
    ) { 
    
    }

  ngOnInit(): void {
    
  }

  logIn(form: NgForm){
    this.loading = true;
    // console.log(form.value);
    return this.authenticationService.onLoginTokenObtained(form.value, form.value).subscribe();
    
    form.reset();

    

  };

}

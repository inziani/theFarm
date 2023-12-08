import { Component, OnInit } from '@angular/core';
import { UsersService } from '@app/_helpers/services/users.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
})
export class AuthenticationComponent implements OnInit {
  public userAction!: string;
  public errorMessage!: string;
  public isLoading = true;
  constructor(private _userService: UsersService) {}

  ngOnInit() {
    this._userService.data.subscribe({
      next: (userAction) => (this.userAction = userAction),
      error: (err) => (this.errorMessage = err),
      complete: () => console.info(),
    });
  }
}

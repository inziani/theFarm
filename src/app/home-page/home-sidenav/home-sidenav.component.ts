import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UsersService } from '@app/_helpers/services/users.service';

@Component({
  selector: 'app-home-sidenav',
  templateUrl: './home-sidenav.component.html',
  styleUrls: ['./home-sidenav.component.css'],
})
export class HomeSidenavComponent implements OnInit {
  @Output() closedSideNav = new EventEmitter<void>();
  public isAuthenticated: boolean = false;
  public logInUserAction: string = 'login';
  public signUpUserAction: string = 'signup';

  constructor(private _userService: UsersService) {}

  ngOnInit(): void {}

  public onClose() {
    this.closedSideNav.emit();
  }

  public onLogIn() {
    this._userService.sendData(this.logInUserAction);
  }

  public onSignUp() {
    this._userService.sendData(this.signUpUserAction);
  }
}

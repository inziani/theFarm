import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  @Output() closeSideNav = new EventEmitter<void>();
  openPanel: boolean = false;



  constructor(
    private _authorizationService: AuthenticationService
  ) {

  }

  ngOnInit(): void {
  }

  onClose() {
    this.closeSideNav.emit();
  }

  onLogOut() {

    this._authorizationService.onLogout();

  }

}

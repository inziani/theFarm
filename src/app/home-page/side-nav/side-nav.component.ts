import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthenticationService } from '../../_helpers/services/authentication.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
})
export class SideNavComponent implements OnInit {
  @Output() closeSideNav = new EventEmitter<void>();
  openPanel: boolean = false;

  constructor(private _authorizationService: AuthenticationService) {}

  ngOnInit(): void {}

  public onClose() {
    this.closeSideNav.emit();
  }

  public onLogOut() {
    this._authorizationService.onLogout();
  }
}

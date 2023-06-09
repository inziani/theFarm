import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RestDataSource } from '@app/shared/data/rest.datasource';

@Component({
  selector: 'app-profile-sidenav',
  templateUrl: './profile-sidenav.component.html',
  styleUrls: ['./profile-sidenav.component.css'],
})
export class ProfileSidenavComponent implements OnInit {
  @Output() closeSideNav = new EventEmitter<void>();

  constructor(private restDataSource: RestDataSource) {}

  ngOnInit(): void {}

  onClose() {
    this.closeSideNav.emit();
  }

  onLogOut() {
    this.restDataSource.removeToken();
  }
}

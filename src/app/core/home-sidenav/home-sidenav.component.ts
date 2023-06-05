import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-home-sidenav',
  templateUrl: './home-sidenav.component.html',
  styleUrls: ['./home-sidenav.component.css'],
})
export class HomeSidenavComponent implements OnInit {
  @Output() closedSideNav = new EventEmitter<void>();
  public isAuthenticated: boolean = false;
  showFiller = false;

  constructor() {}

  ngOnInit(): void {}

  onClose() {
    this.closedSideNav.emit();
  }
}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RestDataSource } from '../shared/data/rest.datasource';

@Component({
  selector: 'app-home-sidenav',
  templateUrl: './home-sidenav.component.html',
  styleUrls: ['./home-sidenav.component.css']
})
export class HomeSidenavComponent implements OnInit {

  @Output() closedSideNav = new EventEmitter<void>();

  constructor(
    private restDataSource: RestDataSource
  ) { }

  ngOnInit(): void {
  }

  onClose() {

    this.closedSideNav.emit();
  }

}

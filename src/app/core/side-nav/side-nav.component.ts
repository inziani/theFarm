import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RestDataSource } from '@app/shared/data/rest.datasource';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  @Output() closeSideNav = new EventEmitter<void>();


  constructor(
    private dataSource: RestDataSource
  ) { }

  ngOnInit(): void {
  }

  onClose() {
    this.closeSideNav.emit();
  }

  onLogOut() {

    this.dataSource.removeToken();

  }

}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';


import { RestDataSource } from '@app/core/shared/data/rest.datasource';
import { UserProfile } from '@app/core/shared/interfaces/sidenav-trees';


@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  @Output() closeSideNav = new EventEmitter<void>();
  openPanel: boolean = false;



  constructor(
    private restDataSource: RestDataSource
  ) {

  }

  ngOnInit(): void {
  }

  onClose() {
    this.closeSideNav.emit();
  }

  onLogOut() {

    this.restDataSource.removeToken();

  }

}

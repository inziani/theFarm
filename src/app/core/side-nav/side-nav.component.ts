import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';


import { RestDataSource } from '@app/shared/data/rest.datasource';
import { UserProfile } from '@app/shared/interfaces/sidenav-trees';

const ProfileTree: UserProfile[] = [
  {
    name: 'Profile',
    children: [
      { name: 'Account' },
      { name: 'Tasks' },
    ]
  }
]

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  @Output() closeSideNav = new EventEmitter<void>();

  treeControl = new NestedTreeControl<UserProfile>(node => node.children);
  treeDataSource = new MatTreeNestedDataSource<UserProfile>();

  constructor(
    private dataSource: RestDataSource
  ) {

    this.treeDataSource.data = ProfileTree;
  }

  hasChild = (_: number, node: UserProfile) => !!node.children && node.children.length > 0;

  ngOnInit(): void {
  }

  onClose() {
    this.closeSideNav.emit();
  }

  onLogOut() {

    this.dataSource.removeToken();

  }

}

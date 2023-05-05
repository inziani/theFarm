import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FlatTreeControl, NestedTreeControl } from '@angular/cdk/tree';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
  MatTreeNestedDataSource,
} from '@angular/material/tree';

import {
  SideNavNode,
  SideNavNodeFlattener,
} from '../../shared/interfaces/sidenav-tree-interface';
import { GL_TREE_DATA } from '../finance-data/gl-tree-data';
import { AuthenticationService } from '@app/core/services/authentication.service';

@Component({
  selector: 'app-finance-sidenav',
  templateUrl: './finance-sidenav.component.html',
  styleUrls: ['./finance-sidenav.component.css'],
})
export class FinanceSidenavComponent implements OnInit {
  @Output() closeSideNav = new EventEmitter<void>();

  /* Flat Tree TreeControl controls the expand/collapse state of the tree nodes*/
  private _transformer = (node: SideNavNode, level: number): any => {
    return {
      name: node.name,
      expandable: !!node.children && node.children.length > 0,
      level,
      routerLink: node.routerLink,
      iconname: node.iconname,
    };
  };

  public flatTreeControl = new FlatTreeControl<SideNavNodeFlattener>(
    (node) => node.level,
    (node) => node.expandable
  );

  // The TreeFlattener is used to generate the flat list of items from the hierachical data

  public treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );

  public flatDataSource!: MatTreeFlatDataSource<
    SideNavNode,
    SideNavNodeFlattener
  >;

  // Nested Tree

  public nestedDataSource = new MatTreeNestedDataSource<SideNavNode>();
  public nestedTreeControl = new NestedTreeControl<SideNavNode>(
    (node) => node.children
  );

  constructor(
    private _authenticationService: AuthenticationService) {
    this.flatDataSource = new MatTreeFlatDataSource(
      this.flatTreeControl,
      this.treeFlattener
    );
  }

  ngOnInit(): void {
    this.flatDataSource.data = GL_TREE_DATA;
    this.nestedDataSource.data = GL_TREE_DATA;
  }

  // Get the nested node using the hasNestedChild

  public hasNestedChild(index: number, node: SideNavNode) {
    return node?.children && node.children.length > 0;
  }

  public hasFlatChild = (_: Number, node: SideNavNodeFlattener) =>
    node.expandable;

  public onClose() {
    this.closeSideNav.emit();
  }

  public onLogOut() {
    this._authenticationService.onLogout();
  }
}

import { FlatTreeControl, NestedTreeControl } from '@angular/cdk/tree';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeNestedDataSource } from '@angular/material/tree';

import { SideNavNode, SideNavNodeFlattener } from '@app/shared/interfaces/sidenav-tree-interface';
import { SALES_TREE_DATA } from '../sales-data/sales-tree-data';

@Component({
  selector: 'app-sales-sidenav',
  templateUrl: './sales-sidenav.component.html',
  styleUrls: ['./sales-sidenav.component.css'],
})
export class SalesSidenavComponent {
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

  constructor() {
    this.flatDataSource = new MatTreeFlatDataSource(
      this.flatTreeControl,
      this.treeFlattener
    );
  }

  ngOnInit(): void {
    this.flatDataSource.data = SALES_TREE_DATA;
    this.nestedDataSource.data = SALES_TREE_DATA;
  }

  public hasNestedChild(index: number, node: SideNavNode) {
    return node?.children && node.children.length > 0;
  }

  public hasFlatChild = (_: Number, node: SideNavNodeFlattener) =>
    node.expandable;

  public onClose() {
    this.closeSideNav.emit();
  }
}

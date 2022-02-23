import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FlatTreeControl, NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeNestedDataSource } from '@angular/material/tree';

import { GeneralLedgerNode, TreeNode } from '../finance-interfaces/gl-tree-interface';
import { GL_TREE_DATA } from '../finance-data/gl-tree-data';

import { of as observableOf } from 'rxjs';


@Component({
  selector: 'app-finance-sidenav',
  templateUrl: './finance-sidenav.component.html',
  styleUrls: ['./finance-sidenav.component.css']
})
export class FinanceSidenavComponent implements OnInit {
  @Output() closeSideNav = new EventEmitter<void>();

  /* TreeControl controls the expand/collapse state o the tree nodes*/

  public flatTreeControl!: FlatTreeControl<TreeNode>;

  // The TreeFlattener is used to generate the flat list of items from the hierachical data

  public treeFlattener!: MatTreeFlattener<GeneralLedgerNode, TreeNode>;
  public flatSourceData!: MatTreeFlatDataSource<GeneralLedgerNode, TreeNode>;

  public nestedDataSource = new MatTreeNestedDataSource<GeneralLedgerNode>();
  public nestedTreeControl = new NestedTreeControl<GeneralLedgerNode>(node =>node.children);

  constructor() {
    // this.treeFlattener = new MatTreeFlattener(
    //   this.transformer,
    //   this.getLevel,
    //   this.isExpandable,
    //   this.getChildren);

    this.flatTreeControl = new FlatTreeControl<TreeNode>(this.getLevel, this.isExpandable);
    this.flatSourceData = new MatTreeFlatDataSource(this.flatTreeControl, this.treeFlattener);


   }

  ngOnInit(): void {

    // this.flatSourceData.data = GL_TREE_DATA;
    this.nestedDataSource.data = GL_TREE_DATA;
  }

  // Get the nested node using the hasNestedChild

  public hasNestedChild(index: number, node: GeneralLedgerNode) {
    return node?.children && node.children.length > 0;

  }

  /** Transform the data to something the tree can read. */

  public transformer(node: GeneralLedgerNode, level: number) {
    return {
      name: node.name,
      iconname: node.iconname,
      level: level,
      expandable: !!node.children
    };
  }

  /** Get the level of the node */

  public getLevel(node: TreeNode) {
    return node.level;
  }

  /** Return whether the node is expanded or not. */

  public isExpandable(node: TreeNode) {
    return node.expandable;
  };

  /** Get the children for the node. */

  public getChildren(node: GeneralLedgerNode) {
    return observableOf(node.children);
  }

  /** Get whether the node has children or not. */

  public hasChild(index: number, node: TreeNode){
    return node.expandable;
  }

  public onClose() {
    this.closeSideNav.emit();
  }

}

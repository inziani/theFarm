
// File Node with nested structure
export interface GeneralLedgerNode{
  name: string;
  iconname?: string,
  routerLink?: string,
  children?: GeneralLedgerNode[];
}

// FlatNode with Expandable and level information

export interface TreeNode{
  name: string;
  iconname: string;
  level: number;
  expandable: boolean


}



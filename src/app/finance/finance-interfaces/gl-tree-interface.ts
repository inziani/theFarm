
// File Node with nested structure
export interface FinanceNode{
  name: string;
  iconname?: string,
  routerLink?: string,
  children?: FinanceNode[];
}

// FlatNode with Expandable and level information

export interface FinanceFlattener{
  expandable: boolean;
  name: string;
  level: number;






}



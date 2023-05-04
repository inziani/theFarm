
// File Node with nested structure
export interface SideNavNode {
  name: string;
  iconname?: string;
  routerLink?: string;
  children?: SideNavNode[];
}

// FlatNode with Expandable and level information

export interface SideNavNodeFlattener {
  expandable: boolean;
  name: string;
  level: number;
}



import { GeneralLedgerNode } from "../finance-interfaces/gl-tree-interface";


 export const GL_TREE_DATA: GeneralLedgerNode[] = [

  {
    name: 'financeHub',
    iconname: 'folder',
    routerLink: '/finance',
    children: []

  },

  {
    name: 'Generel Ledger',
    iconname: 'table_chart',
    children: [
      {
        name: 'Master Data',
        iconname: 'folder',
        children: [{name: 'Create Account'}, {name: 'Edit Account'}, {name: 'Display Account'}, {name: 'Delete Account'}]

      },
      {
        name: 'Document Entry',
        iconname: 'folder',
        children: [{ name: 'Post Document'}, {name: 'Edit Document'}, {name: 'Delete Document'},{ name: 'Document Display'}]
      },
      {
        name: 'Account',
        iconname: 'folder',
        children: [{name: 'Account Balances'}, { name: 'Account Line Items'}, {name: 'Account Listing'}]
      }
    ]

  },
  {
    name: 'smallFarmsHome',
    iconname: 'home',
    routerLink: '/home',
    children:[]  }

]

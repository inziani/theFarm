import { FinanceNode } from "../finance-interfaces/gl-tree-interface";


export const GL_TREE_DATA: FinanceNode[] = [

   {
    name: 'smallFarms',
    iconname: 'home',
    routerLink: '/home',
    children:[]  },
  {
    name: 'financeHub',
    iconname: 'folder',
    routerLink: '/finance',
    children: []
  },

  {
    name: 'Generel Ledger',
    iconname: 'table_chart',
    routerLink: '/glhome',
    children: [
      {
        name: 'Master Data',
        iconname: 'folder',
        routerLink: '/mainglmasterdata',
        children: [{name: 'Create Account'}, {name: 'Edit Account'}, {name: 'Display Account'}, {name: 'Delete Account'}]

      },
      {
        name: 'Document Entry',
        iconname: 'folder',
        routerLink: '/finance',
        children: [{ name: 'Post Document', iconname: 'insert_drive_file'}, {name: 'Edit Document', iconname: 'description'}, {name: 'Delete Document', iconname: 'delete'},{ name: 'Document Display', iconname: 'speaker_notes'}]
      },
      {
        name: 'Account',
        iconname: 'folder',
        routerLink: '/finance',
        children: [{name: 'Account Balances'}, { name: 'Line Items'}, {name: 'Account Listing'}]
      }
    ]

   },
   {
    name: 'Payables',
    iconname: 'payment',
    routerLink: '/glhome',
    children: [
      {
        name: 'Master Data',
        iconname: 'folder',
        routerLink: '/mainglmasterdata',
        children: [{name: 'Create Account'}, {name: 'Edit Account'}, {name: 'Display Account'}, {name: 'Delete Account'}]

      },
      {
        name: 'Document Entry',
        iconname: 'folder',
        routerLink: '/finance',
        children: [{ name: 'Post Document', iconname: 'insert_drive_file'}, {name: 'Edit Document', iconname: 'description'}, {name: 'Delete Document', iconname: 'delete'},{ name: 'Document Display', iconname: 'speaker_notes'}]
      },
      {
        name: 'Account',
        iconname: 'folder',
        routerLink: '/finance',
        children: [{name: 'Account Balances'}, { name: 'Line Items'}, {name: 'Account Listing'}]
      }
    ]

  },
  {
    name: 'Receivables',
    iconname: 'receipt',
    routerLink: '/glhome',
    children: [
      {
        name: 'Master Data',
        iconname: 'folder',
        routerLink: '/mainglmasterdata',
        children: [{name: 'Create Account'}, {name: 'Edit Account'}, {name: 'Display Account'}, {name: 'Delete Account'}]

      },
      {
        name: 'Document Entry',
        iconname: 'folder',
        routerLink: '/finance',
        children: [{ name: 'Post Document', iconname: 'insert_drive_file'}, {name: 'Edit Document', iconname: 'description'}, {name: 'Delete Document', iconname: 'delete'},{ name: 'Document Display', iconname: 'speaker_notes'}]
      },
      {
        name: 'Account',
        iconname: 'folder',
        routerLink: '/finance',
        children: [{name: 'Account Balances'}, { name: 'Line Items'}, {name: 'Account Listing'}]
      }
    ]

  },
  {
    name: 'Fixed Assets',
    iconname: 'hd',
    routerLink: '/glhome',
    children: [
      {
        name: 'Master Data',
        iconname: 'folder',
        routerLink: '/mainglmasterdata',
        children: [{name: 'Create Account'}, {name: 'Edit Account'}, {name: 'Display Account'}, {name: 'Delete Account'}]

      },
      {
        name: 'Document Entry',
        iconname: 'folder',
        routerLink: '/finance',
        children: [{ name: 'Post Document', iconname: 'insert_drive_file'}, {name: 'Edit Document', iconname: 'description'}, {name: 'Delete Document', iconname: 'delete'},{ name: 'Document Display', iconname: 'speaker_notes'}]
      },
      {
        name: 'Account',
        iconname: 'folder',
        routerLink: '/finance',
        children: [{name: 'Account Balances'}, { name: 'Line Items'}, {name: 'Account Listing'}]
      }
    ]

  },
  {
    name: 'Banks',
    iconname: 'money',
    routerLink: '/glhome',
    children: [
      {
        name: 'Master Data',
        iconname: 'folder',
        routerLink: '/mainglmasterdata',
        children: [{name: 'Create Account'}, {name: 'Edit Account'}, {name: 'Display Account'}, {name: 'Delete Account'}]

      },
      {
        name: 'Document Entry',
        iconname: 'folder',
        routerLink: '/finance',
        children: [{ name: 'Post Document', iconname: 'insert_drive_file'}, {name: 'Edit Document', iconname: 'description'}, {name: 'Delete Document', iconname: 'delete'},{ name: 'Document Display', iconname: 'speaker_notes'}]
      },
      {
        name: 'Account',
        iconname: 'folder',
        routerLink: '/finance',
        children: [{name: 'Account Balances'}, { name: 'Line Items'}, {name: 'Account Listing'}]
      }
    ]

  },
{
    name: 'Reporting',
    iconname: 'analytics',
    routerLink: '/home',
    children:[]  },]



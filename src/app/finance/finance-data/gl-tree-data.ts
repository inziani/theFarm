import { FinanceNode } from "../finance-interfaces/gl-tree-interface";


export const GL_TREE_DATA: FinanceNode[] = [

   {
    name: 'smallFarms',
    iconname: 'home',
    routerLink: '/home',
    children: []
  },
  {
    name: 'Organizational Structure',
    iconname: 'folder',
    routerLink: '/finance',
    children: []
  },
   {
    name: 'General Ledger',
    iconname: 'folder',
    routerLink: '/finance',
     children: [

        {
    name: 'Master Data',
    iconname: 'folder',
    routerLink: '/finance',
    children: [
      { name: 'Create Account', iconname: 'library_add', routerLink: '/glmasterdata', },
      { name: 'Edit Account', iconname: 'edit', routerLink: '/glmasterdata'  },
      { name: 'Display Account', iconname: 'library_books', routerLink: '/glmasterdata'  },
      { name: 'Delete Account', iconname: 'delete', routerLink: '/glmasterdata'  }
    ]
  },
  {
    name: 'Document Entry',
    iconname: 'folder',
    routerLink: '/finance',
    children: [
      { name: 'Post Document', iconname: 'note_add', routerLink: '/finance' },
      { name: 'Edit Document', iconname: 'edit', routerLink: '/finance' },
      { name: 'Delete Document', iconname: 'delete', routerLink: '/finance'  },
      { name: 'Document Display', iconname: 'pageview', routerLink: '/finance'  }
    ]
  },
  {
    name: 'Balances',
    iconname: 'folder',
    routerLink: '/finance',
    children: [
      { name: 'Account Balances', iconname: 'account_balance', routerLink: '/finance'  },
      { name: 'Line Items', iconname: 'list_alt', routerLink: '/finance'  },
      { name: 'Account Listing', iconname: 'format_list_numbered', routerLink: '/finance' }
    ]
       },

    ]
  },

   {
    name: 'Payables',
    iconname: 'payment',
    routerLink: '/finance',
    children: [
      {
        name: 'Master Data',
        iconname: 'folder',
        routerLink: '/glmasterdata',
        children: [
      { name: 'Create Account', iconname: 'library_add', routerLink: '/glmasterdata', },
      { name: 'Edit Account', iconname: 'edit', routerLink: '/glmasterdata'  },
      { name: 'Display Account', iconname: 'library_books', routerLink: '/glmasterdata'  },
      { name: 'Delete Account', iconname: 'delete', routerLink: '/glmasterdata'  }
        ]

      },
      {
        name: 'Document Entry',
        iconname: 'folder',
        routerLink: '/finance',
        children: [
          { name: 'Post Document', iconname: 'insert_drive_file' },
          { name: 'Edit Document', iconname: 'description' },
          { name: 'Delete Document', iconname: 'delete' },
          { name: 'Document Display', iconname: 'speaker_notes' }]
      },
      {
        name: 'Account',
        iconname: 'folder',
        routerLink: '/finance',
        children: [
        { name: 'Account Balances' },
        { name: 'Line Items' },
        { name: 'Account Listing' }
        ]
      }
    ]
  },
  {
    name: 'Receivables',
    iconname: 'receipt',
    routerLink: '/finance',
    children: [
      {
        name: 'Master Data',
        iconname: 'folder',
        routerLink: '/glmasterdata',
        children: [
      { name: 'Create Account', iconname: 'library_add', routerLink: '/glmasterdata', },
      { name: 'Edit Account', iconname: 'edit', routerLink: '/glmasterdata'  },
      { name: 'Display Account', iconname: 'library_books', routerLink: '/glmasterdata'  },
      { name: 'Delete Account', iconname: 'delete', routerLink: '/glmasterdata'  }
        ]

      },
      {
        name: 'Document Entry',
        iconname: 'folder',
        routerLink: '/finance',
        children: [
          { name: 'Post Document', iconname: 'insert_drive_file' },
          { name: 'Edit Document', iconname: 'description' },
          { name: 'Delete Document', iconname: 'delete' },
          { name: 'Document Display', iconname: 'speaker_notes' }
        ]
      },
      {
        name: 'Account',
        iconname: 'folder',
        routerLink: '/finance',
        children: [
        { name: 'Account Balances' },
        { name: 'Line Items' },
        { name: 'Account Listing' }
        ]
      }
    ]

  },
  {
    name: 'Fixed Assets',
    iconname: 'hd',
    routerLink: '/finance',
    children: [
      {
        name: 'Master Data',
        iconname: 'folder',
        routerLink: '/glmasterdata',
        children: [
      { name: 'Create Account', iconname: 'library_add', routerLink: '/glmasterdata', },
      { name: 'Edit Account', iconname: 'edit', routerLink: '/glmasterdata'  },
      { name: 'Display Account', iconname: 'library_books', routerLink: '/glmasterdata'  },
      { name: 'Delete Account', iconname: 'delete', routerLink: '/glmasterdata'  }
        ]

      },
      {
        name: 'Document Entry',
        iconname: 'folder',
        routerLink: '/finance',
        children: [
          { name: 'Post Document', iconname: 'insert_drive_file' },
          { name: 'Edit Document', iconname: 'description' },
          { name: 'Delete Document', iconname: 'delete' },
          { name: 'Document Display', iconname: 'speaker_notes' }
        ]
      },
      {
        name: 'Account',
        iconname: 'folder',
        routerLink: '/finance',
        children: [
          { name: 'Account Balances' },
          { name: 'Line Items' },
          { name: 'Account Listing' }
        ]
      }
    ]

  },
  {
    name: 'Banks',
    iconname: 'money',
    routerLink: '/finance',
    children: [
      {
        name: 'Master Data',
        iconname: 'folder',
        routerLink: '/glmasterdata',
        children: [

      { name: 'Create Account', iconname: 'library_add', routerLink: '/glmasterdata', },
      { name: 'Edit Account', iconname: 'edit', routerLink: '/glmasterdata'  },
      { name: 'Display Account', iconname: 'library_books', routerLink: '/glmasterdata'  },
      { name: 'Delete Account', iconname: 'delete', routerLink: '/glmasterdata'  }
        ]

      },
      {
        name: 'Document Entry',
        iconname: 'folder',
        routerLink: '/finance',
        children: [
          { name: 'Post Document', iconname: 'insert_drive_file' },
          { name: 'Edit Document', iconname: 'description' },
          { name: 'Delete Document', iconname: 'delete' },
          { name: 'Document Display', iconname: 'speaker_notes' }
        ]
      },
      {
        name: 'Account',
        iconname: 'folder',
        routerLink: '/finance',
        children: [
          { name: 'Account Balances' },
          { name: 'Line Items' },
          { name: 'Account Listing' }
        ]
      }
    ]

  },
{
    name: 'Reporting',
    iconname: 'analytics',
    routerLink: '/finance',
    children: []
  },]



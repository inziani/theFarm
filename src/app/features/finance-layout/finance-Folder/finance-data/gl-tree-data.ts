import { SideNavNode } from '../../../../shared/interfaces/sidenav-tree-interface';

export const GL_TREE_DATA: SideNavNode[] = [
  {
    name: 'smallFarms Home',
    iconname: 'home',
    routerLink: '/home',
    children: [],
  },

  {
    name: 'General Ledger',
    iconname: 'business',
    routerLink: 'glHome',
    children: [
      {
        name: 'Master Data',
        iconname: 'library_add',
        routerLink: 'glMasterData',
      },
      {
        name: 'Document Entry',
        iconname: 'description',
        routerLink: 'glMasterData',
      },

      {
        name: 'Reports',
        iconname: 'analytics',
        routerLink: 'glReports',
      },
      {
        name: 'GL Groupings',
        iconname: 'group_work',
        routerLink: 'glTransactionsCodes',
        children: [],
      },

      {
        name: 'Finance Org Structures',
        iconname: 'category',
        routerLink: 'financeOrgStructures',
        children: [],
      },
    ],
  },

  {
    name: 'Payables',
    iconname: 'payment',
    routerLink: '/financeHome',
    children: [
      {
        name: 'Master Data',
        iconname: 'library_add',
        routerLink: '/glmasterdata',
      },
      {
        name: 'Document Entry',
        iconname: 'description',
        routerLink: '/glmasterdata',
      },
      {
        name: 'Balances',
        iconname: 'list',
        routerLink: '/glmasterdata',
      },
      {
        name: 'Reports',
        iconname: 'analytics',
        routerLink: '/glmasterdata',
      },
    ],
  },
  {
    name: 'Receivables',
    iconname: 'receipt',
    routerLink: '/financeHome',
    children: [
      {
        name: 'Master Data',
        iconname: 'library_add',
        routerLink: '/glmasterdata',
      },
      {
        name: 'Document Entry',
        iconname: 'description',
        routerLink: '/glmasterdata',
      },
      {
        name: 'Balances',
        iconname: 'list',
        routerLink: '/glmasterdata',
      },
      {
        name: 'Reports',
        iconname: 'analytics',
        routerLink: '/glmasterdata',
      },
    ],
  },
  {
    name: 'Fixed Assets',
    iconname: 'hd',
    routerLink: '/financeHome',
    children: [
      {
        name: 'Master Data',
        iconname: 'library_add',
        routerLink: '/glmasterdata',
      },
      {
        name: 'Document Entry',
        iconname: 'description',
        routerLink: '/glmasterdata',
      },
      {
        name: 'Balances',
        iconname: 'list',
        routerLink: '/glmasterdata',
      },
      {
        name: 'Reports',
        iconname: 'analytics',
        routerLink: '/glmasterdata',
      },
    ],
  },
  {
    name: 'Banks',
    iconname: 'money',
    routerLink: '/financeHome',
    children: [
      {
        name: 'Master Data',
        iconname: 'library_add',
        routerLink: '/glmasterdata',
      },
      {
        name: 'Document Entry',
        iconname: 'description',
        routerLink: '/glmasterdata',
      },
      {
        name: 'Balances',
        iconname: 'list',
        routerLink: '/glmasterdata',
      },
      {
        name: 'Reports',
        iconname: 'analytics',
        routerLink: '/glmasterdata',
      },
    ],
  },
  {
    name: 'Reporting',
    iconname: 'analytics',
    routerLink: '/financeHome',
    children: [],
  },
  // {
  //   name: 'Log Out',
  //   iconname: 'logout',
  //   routerLink: 'logout',
  //   // children: [],

  // },
];

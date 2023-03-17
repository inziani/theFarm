import { FinanceNode } from '../finance-interfaces/gl-tree-interface';

export const GL_TREE_DATA: FinanceNode[] = [
  {
    name: 'smallFarms',
    iconname: 'home',
    routerLink: '/home',
    children: [],
  },
  {
    name: 'Organizational Structure',
    iconname: 'category',
    routerLink: '/finance',
    children: [],
  },

  {
    name: 'General Ledger',
    iconname: 'business',
    routerLink: '/finance',
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
    name: 'Payables',
    iconname: 'payment',
    routerLink: '/finance',
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
    routerLink: '/finance',
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
    routerLink: '/finance',
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
    routerLink: '/finance',
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
    routerLink: '/finance',
    children: [],
  },
];

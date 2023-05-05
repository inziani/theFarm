import { SideNavNode } from '../../shared/interfaces/sidenav-tree-interface';

export const SALES_TREE_DATA: SideNavNode[] = [
  {
    name: 'smallFarms Home',
    iconname: 'home',
    routerLink: '/home',
    children: [],
  },
  {
    name: 'Sales Orders',
    iconname: 'category',
    routerLink: 'salesOrder',
    children: [
      // {
      //   name: 'Reporting',
      //   iconname: 'analytics',
      //   routerLink: 'saleReports',
      //   children: [],
      // },
    ],
  },
  {
    name: 'Reporting',
    iconname: 'analytics',
    routerLink: 'saleReports',
    children: [],
  },

  // {
  //   name: 'Sales Order',
  //   iconname: 'business',
  //   routerLink: '/salesOrder',
  //   children: [
  //     {
  //       name: 'Master Data',
  //       iconname: 'library_add',
  //       routerLink: '/salesOderMasterData',
  //     },
  //     {
  //       name: 'Document Entry',
  //       iconname: 'description',
  //       routerLink: '/salesOderMasterData',
  //     },
  //     {
  //       name: 'Balances',
  //       iconname: 'list',
  //       routerLink: '/salesOderMasterData',
  //     },
  //     {
  //       name: 'Reports',
  //       iconname: 'analytics',
  //       routerLink: '/salesOderMasterData',
  //     },
  //   ],
  // },

  // {
  //   name: 'Payables',
  //   iconname: 'payment',
  //   routerLink: '/salesHome',
  //   children: [
  //     {
  //       name: 'Master Data',
  //       iconname: 'library_add',
  //       routerLink: '/salesHome',
  //     },
  //     {
  //       name: 'Document Entry',
  //       iconname: 'description',
  //       routerLink: '/salesHome',
  //     },
  //     {
  //       name: 'Balances',
  //       iconname: 'list',
  //       routerLink: '/salesHome',
  //     },
  //     {
  //       name: 'Reports',
  //       iconname: 'analytics',
  //       routerLink: '/salesHome',
  //     },
  //   ],
  // },
  // {
  //   name: 'Receivables',
  //   iconname: 'receipt',
  //   routerLink: '/salesHome',
  //   children: [
  //     {
  //       name: 'Master Data',
  //       iconname: 'library_add',
  //       routerLink: '/salesHome',
  //     },
  //     {
  //       name: 'Document Entry',
  //       iconname: 'description',
  //       routerLink: '/salesHome',
  //     },
  //     {
  //       name: 'Balances',
  //       iconname: 'list',
  //       routerLink: '/salesHome',
  //     },
  //     {
  //       name: 'Reports',
  //       iconname: 'analytics',
  //       routerLink: '/salesHome',
  //     },
  //   ],
  // },
  // {
  //   name: 'Fixed Assets',
  //   iconname: 'hd',
  //   routerLink: '/salesHome',
  //   children: [
  //     {
  //       name: 'Master Data',
  //       iconname: 'library_add',
  //       routerLink: '/salesHome',
  //     },
  //     {
  //       name: 'Document Entry',
  //       iconname: 'description',
  //       routerLink: '/salesHome',
  //     },
  //     {
  //       name: 'Balances',
  //       iconname: 'list',
  //       routerLink: '/salesHome',
  //     },
  //     {
  //       name: 'Reports',
  //       iconname: 'analytics',
  //       routerLink: '/salesHome',
  //     },
  //   ],
  // },
  // {
  //   name: 'Banks',
  //   iconname: 'money',
  //   routerLink: '/salesHome',
  //   children: [
  //     {
  //       name: 'Master Data',
  //       iconname: 'library_add',
  //       routerLink: '/salesHome',
  //     },
  //     {
  //       name: 'Document Entry',
  //       iconname: 'description',
  //       routerLink: '/salesHome',
  //     },
  //     {
  //       name: 'Balances',
  //       iconname: 'list',
  //       routerLink: '/salesHome',
  //     },
  //     {
  //       name: 'Reports',
  //       iconname: 'analytics',
  //       routerLink: '/salesHome',
  //     },
  //   ],
  // },
];

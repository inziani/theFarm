import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-finance-sidenav',
  templateUrl: './finance-sidenav.component.html',
  styleUrls: ['./finance-sidenav.component.scss']
})
export class FinanceSidenavComponent implements OnInit {
  @Output() closeSideNav = new EventEmitter<void>();
  openPanel: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

   onClose() {
    this.closeSideNav.emit();
  }

  }



import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-finance-navbar',
  templateUrl: './finance-navbar.component.html',
  styleUrls: ['./finance-navbar.component.css']
})
export class FinanceNavbarComponent implements OnInit {
   @Output() sideNavToggle = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

   onToggleSidenav() {

    this.sideNavToggle.emit();

  }

}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-finance-sidenav',
  templateUrl: './finance-sidenav.component.html',
  styleUrls: ['./finance-sidenav.component.css']
})
export class FinanceSidenavComponent implements OnInit {
  @Output() closeSideNav = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onClose() {
    this.closeSideNav.emit();
  }

}

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FinanceService } from '@app/core/services/finance.service';


@Component({
  selector: 'app-finance-home',
  templateUrl: './finance-home.component.html',
  styleUrls: ['./finance-home.component.css']
})
export class FinanceHomeComponent implements OnInit {
  public itemSelected!: string;
  public errorMessage!: string;


  constructor(
    public dialog: MatDialog,
    public financeService: FinanceService
  ) { }

  ngOnInit(): void {
    this.financeService.itemSelected.subscribe({
      next: (orgUnit: string) => (this.itemSelected = orgUnit),
      error: (error: string) => (this.errorMessage = error),
      complete: () => console.info('Complete'),
    });
  }

  ngOnDestroy(): void{

  }
}

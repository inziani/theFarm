import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { GLAccountGroupMasterData } from '@app/finance/finance-models/fi-form-models/gl-master-data-model';
import { GLAccountGroup } from '@app/finance/finance-models/fi-data-models/organization-data-models';
import { MatTableDataSource } from '@angular/material/table';
import { FinanceService } from '@app/core/services/finance.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-account-group-details',
  templateUrl: './account-group-details.component.html',
  styleUrls: ['./account-group-details.component.css'],
})
export class AccountGroupDetailsComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public accountGroupList!: GLAccountGroup[];
  public sourceData = new MatTableDataSource<GLAccountGroup>();
  public accountGroupColumnHeaders: string[] = [
    'id',
    'accountGroup',
    'accountGroupDescription',
    'display',
    'edit',
    'delete',
  ];
  public resultsLength = 0;

  constructor(
    private _financeService: FinanceService,
    private _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this._financeService.glAccountGroupsData.subscribe((response) => {
      this.sourceData.data = response;
    });

    
  }

  ngAfterViewInit() {
    this.sourceData.sort = this.sort;
    this.sourceData.paginator = this.paginator;
  }

  public onCreateAccountGroup() {
    // Open Dialogue for Account group maintenance
  }

  public onDisplayAccountGroup(id: number) {
    // Open Dialogue for Account group maintenance
  }

  public onEditAccountGroup(id: number) {
    // Open Dialogue for Account Group Maintenance
  }

  public onDeleteAccountGroup(id: number) {
    // Open Dialogue for Account Group Maintenance
  }
}

import { Component, Inject, OnInit } from '@angular/core';

import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RestDataSource } from '@app/shared/data/rest.datasource';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {

  title: string = 'Delete';
  categoryTitle: string = 'Category Title'
   categoryDescription:  string = 'Category Description'

  constructor(

    private dataSource: RestDataSource,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public deleteDialogData: any

  ) { }

  ngOnInit(): void {
  }

  onDeleteActivityCategory() {

  }

}

import { Component, OnInit, Inject } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';

@Component({
  selector: 'app-changes-saved-dialog',
  templateUrl: './changes-saved-dialog.component.html',
  styleUrls: ['./changes-saved-dialog.component.css']
})
export class ChangesSavedDialogComponent implements OnInit {

  constructor(
     @Inject(MAT_DIALOG_DATA) public changedItem: string
  ) { }

  ngOnInit(): void {
  }

}

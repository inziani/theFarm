import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-changes-saved-dialog',
  templateUrl: './changes-saved-dialog.component.html',
  styleUrls: ['./changes-saved-dialog.component.css'],
})
export class ChangesSavedDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public changedItem: string) { }

  ngOnInit(): void {}
}

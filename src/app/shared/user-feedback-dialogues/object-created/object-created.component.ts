import { Component, OnInit, Inject } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';

@Component({
  selector: 'app-object-created',
  templateUrl: './object-created.component.html',
  styleUrls: ['./object-created.component.css']
})
export class ObjectCreatedComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public createdItem: string
  ) { }

  ngOnInit(): void {
  }

}

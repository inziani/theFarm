import { Component, OnInit } from '@angular/core';

  interface ServiceCatalogue {
  value: string;
  viewValue: string;
};



@Component({
  selector: 'app-search-dialog',
  templateUrl: './search-dialog.component.html',
  styleUrls: ['./search-dialog.component.css']
})


export class SearchDialogComponent implements OnInit {

   public services: ServiceCatalogue[] =
    [
      { value: 'My account', viewValue: 'My account' },
      { value: 'Sales', viewValue: 'Sales' },
      { value: 'Finance', viewValue: 'Finance' },
      { value: 'People', viewValue: 'People' },
      { value: 'Projects', viewValue: 'Projects' },
      { value: 'Materials', viewValue: 'Materials' },
      { value: 'Knowledge and Learning', viewValue: 'Knowledge and Learning' }
    ]

  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RestDataSource } from '@app/core/shared/data/rest.datasource';

import { GoogleMap, MapInfoWindow, MapMarker } from "@angular/google-maps";

interface ServiceCatalogue {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public zoomingIn: string = 'zoom in'
  public zoomingOut: string = 'zoom out'

  public date!: Date;
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


  constructor(
    private dataSource: RestDataSource
  ) { }

  ngOnInit(): void {
    this.date = this.dataSource.todaysDate


  }


  submitContactForm(form: NgForm) {
    console.log('This is so much work!');
  }

  zoomIn() {

  }

  zoomOut() {

  }

}

import { Component, OnInit } from '@angular/core';
import { RestDataSource } from '../shared/data/rest.datasource';

import { UserInterface, UserProfileInterface } from '../shared/interfaces/users-interface';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  public testData: UserProfileInterface[] = [];



  constructor(

    private sourceData: RestDataSource,
  ) { }

  ngOnInit(): void {

    this.sourceData.getAllUserProfiles().subscribe(data => {
      this.testData = data;
      console.log('TestData:' , this.testData);
    });

  }



}

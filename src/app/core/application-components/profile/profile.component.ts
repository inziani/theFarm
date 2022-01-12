import { Component, OnInit } from '@angular/core';

import { MatGridList, MatGridTile } from '@angular/material/grid-list';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public loggedInUser: string = 'Valentine Robai Inziani'
  public color = "#fb8500";


  constructor() { }

  ngOnInit(): void {
  }

}

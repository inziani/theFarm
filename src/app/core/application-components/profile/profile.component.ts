import { Component, OnInit } from '@angular/core';

import { MatGridList, MatGridTile } from '@angular/material/grid-list';

import { ProfileTiles } from '@app/shared/interfaces/profile-tiles';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public loggedInUser: string = 'Valentine Robai Inziani'


  public tiles: ProfileTiles[] = [
    { text: "Account Settings", columns: 2, rows: 5, color: "red" },
    { text: "Account Details" , columns: 3, rows: 5, color: "pink" }

  ]

  constructor() { }

  ngOnInit(): void {
  }

}

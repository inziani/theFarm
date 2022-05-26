import { Component, OnInit } from '@angular/core';


import { ProfilePageGridInterface } from '@app/core/shared/interfaces/grids-interface';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public loggedInUser: string = 'Valentine Robai Inziani'
  public color = "#fb8500";

  public tiles: ProfilePageGridInterface[] =
    [
      { text: 'Three', cols: 2, rows: 8},
      { text: 'One', cols: 3, rows: 3 },
      { text: 'Two', cols: 3, rows: 5 },


    ];


  constructor() { }

  ngOnInit(): void {
  }

}

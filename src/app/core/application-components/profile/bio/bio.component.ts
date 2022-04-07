import { Component, OnInit } from '@angular/core';

import { RestDataSource } from '@app/core/shared/data/rest.datasource';
import { UserProfileInterface } from '@app/core/shared/interfaces/users-interface';
import { UserProfile } from '@app/core/shared/models/user.model';

@Component({
  selector: 'app-bio',
  templateUrl: './bio.component.html',
  styleUrls: ['./bio.component.css']
})
export class BioComponent implements OnInit {

  public userProfilesList: UserProfileInterface[] = [];

  constructor(
    private dataSource: RestDataSource
  ) { }

  ngOnInit(): void {
    this.dataSource.getAllUserProfiles().subscribe(UserProfiles => {
      this.userProfilesList = UserProfiles;
      console.log(this.userProfilesList);
    })
  }

}

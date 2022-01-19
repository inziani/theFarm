import { Component, OnInit } from '@angular/core';

import { RestDataSource } from '@app/core/shared/data/rest.datasource';
import { UserProfile } from '@app/core/shared/models/user.model';

@Component({
  selector: 'app-bio',
  templateUrl: './bio.component.html',
  styleUrls: ['./bio.component.css']
})
export class BioComponent implements OnInit {

  userProfilesList!: UserProfile[];

  constructor(
    private dataSource: RestDataSource
  ) { }

  ngOnInit(): void {
    this.dataSource.fetchUserProfiles().subscribe(userProfiles => {
      this.userProfilesList = userProfiles;
      console.log(this.userProfilesList);
    })
  }

}

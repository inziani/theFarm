import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { RestDataSource } from './core/shared/data/rest.datasource';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public isAuthenticated: boolean = false;
  user: any;
  private userSubscription!: Subscription;

  openSideNav = false;

  constructor(

    private dataSource: RestDataSource,
  ) {

  }

  ngOnInit() {

    this.userSubscription = this.dataSource.user.subscribe(
      user => {
        this.isAuthenticated = !!user;
        this.user = user;
      });

  }



  sideNavToggle() {
    return this.openSideNav = true;
  }
}

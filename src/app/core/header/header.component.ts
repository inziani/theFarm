import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { RestDataSource } from '@app/shared/data/rest.datasource';
import { User } from '@app/shared/models/user.model';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Output() sideNavToggle = new EventEmitter<void>();

  public isAuthenticated: boolean = false;
  private userSubscription!: Subscription;
  public user!: any;
  public userList!: User[];
  public loggedInUser!: any;
  public currentLoggedInUser!: User[];

  constructor(
    private dataSource: RestDataSource,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.userSubscription = this.dataSource.user.subscribe(
      user => {
        this.isAuthenticated = !!user;
        this.user = user;
        this.loggedInUser = this.dataSource.fetchUsers().subscribe(users => {
          this.userList = users;
          this.loggedInUser = this.userList.filter((person: User) => person.id === this.user);
          this.currentLoggedInUser = this.loggedInUser;
        })

      });


  }


  onSignUp() {
    this.route.navigate(['signup']);

  }

  onToggleSidenav() {

    this.sideNavToggle.emit();

  }

  onLogOut() {
    this.dataSource.removeToken();
  }

  ngOnDestroy() {

    this.userSubscription.unsubscribe();
  }

}

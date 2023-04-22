import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { RestDataSource } from '@app/core/shared/data/rest.datasource';
import { User } from '@app/core/shared/models/user.model';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { UsersService } from '../services/users.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Output() sideNavToggle = new EventEmitter<void>();
  @Output() homePageNavToggle = new EventEmitter<void>();

  public isAuthenticated: boolean = false;
  private userSubscription!: Subscription;
  public user!: number;
  public userList!: User[];
  public loggedInUser!: any;
  public currentLoggedInUser!: User[];


  constructor(
    private userService: UsersService,
    private authenticationService: AuthenticationService,
    private route: Router
  ) { }

  ngOnInit(): void {
    // this.userSubscription = this.authenticationService.currentUser$.subscribe(
    //   user => {
    //     this.isAuthenticated = !!user;
    //     this.user = user;
    //     this.loggedInUser = this.userService.fetchUsers().subscribe(users => {
    //       this.userList = users;
    //       this.loggedInUser = this.userList.filter((person: User) => person.id === this.user);
    //       this.currentLoggedInUser = this.loggedInUser;

    //     })

    //   });
  }


  onSignUp() {
    this.route.navigate(['signup']);

  }

  onToggleSidenav() {
    this.sideNavToggle.emit();
  }

  onHomePageSideNavToggle() {
    this.homePageNavToggle.emit();
  }

  onLogOut() {
    this.authenticationService.onLogout();
  }

  ngOnDestroy() {

    this.userSubscription.unsubscribe();
  }

}

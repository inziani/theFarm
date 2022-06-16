import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { AuthenticationService } from '../services/authentication.service';
import { RestDataSource } from '../shared/data/rest.datasource';

import { UserInterface, UserProfileInterface } from '../shared/interfaces/users-interface';
import { AuthenticatedUser } from '../shared/models/user.model';
import { AgricultureDialogueComponent } from '../dialogues/agriculture-dialogue/agriculture-dialogue.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit, OnDestroy {

  public users: UserInterface[] = [];
  public userser!: AuthenticatedUser;

  private userSubscription$!: Subscription;
  private routeQueryParams$!: Subscription;


  constructor(

    private sourceData: RestDataSource,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {

    this.sourceData.getAllUsers().subscribe(userData => {
      this.users = userData;
      console.log('TestData:', this.users);
    });

    this.userSubscription$ = this.authenticationService.currentUser$.subscribe(user => {
      this.userser = user;
    });

    this.routeQueryParams$ = this.route.queryParams.subscribe(params => {
      if (params['dialog']) {
        this.openDialog();
      }

    });

  };

  openDialog(): void{

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px';

    const dialogRef = this.dialog.open(AgricultureDialogueComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(success => {
      console.log(success);
      this.router.navigate(['home'], { relativeTo: this.route });
    });
  };

    ngOnDestroy() {
     this.userSubscription$.unsubscribe();
     this.routeQueryParams$.unsubscribe();
  };


}

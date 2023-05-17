import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatLegacyDialog as MatDialog, MatLegacyDialogConfig as MatDialogConfig } from '@angular/material/legacy-dialog';

import { AuthenticationService } from '../services/authentication.service';

import { UserInterface } from '../shared/interfaces/users-interface';
// import { AuthenticatedUser } from '../shared/models/user.model';
import { AgricultureDialogueComponent } from '../dialogues/agriculture-dialogue/agriculture-dialogue.component';
import { HomePageModulesInterface } from '../shared/interfaces/routers-interfaces';
import { FinanceDialogueComponent } from '../dialogues/finance-dialogue/finance-dialogue.component';
import { HrDialogueComponent } from '../dialogues/hr-dialogue/hr-dialogue.component';
import { KnowledgeDialogueComponent } from '../dialogues/knowledge-dialogue/knowledge-dialogue.component';
import { ProjectsDialogueComponent } from '../dialogues/projects-dialogue/projects-dialogue.component';
import { MaterialsDialogueComponent } from '../dialogues/materials-dialogue/materials-dialogue.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit, OnDestroy {

  public users: UserInterface[] = [];
  // public userser!: number;
  public module!: HomePageModulesInterface;
  public homeModules: HomePageModulesInterface[] = [
    { id: 1, description: 'agriculture' },
    { id: 2, description: 'finances' },
    { id: 3, description: 'humanResource' },
    { id: 4, description: 'materialsMgt' },
    { id: 5, description: 'projectMgt' },
    { id: 6, description: 'knowledgeMgt' }
  ];

  private userSubscription$!: Subscription;


  constructor(


    private authenticationService: AuthenticationService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {


  };

  openAgricultureDialog(): void{
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px';
      const dialogRef = this.dialog.open(AgricultureDialogueComponent, dialogConfig);
       dialogRef.afterClosed().subscribe(success => {
      console.log(success);
    });
  };

  openFinanceDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px';
    const dialogRef = this.dialog.open(FinanceDialogueComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(success => {
      console.log(success);
    });
  };

  openHumanResourcesDialogue() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px';
    const dialogRef = this.dialog.open(HrDialogueComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(success => {
      console.log(success);
    });
  };

  openMaterialsDialogue() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px';
    const dialogRef = this.dialog.open(MaterialsDialogueComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(success => {
      console.log(success);
    });

  };

  openProjectsDialogue() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px';
    const dialogRef = this.dialog.open(ProjectsDialogueComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(success => {
      console.log(success);
    });

  };

  openKnowledgeDialogue() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px';
    const dialogRef = this.dialog.open(KnowledgeDialogueComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(success => {
      console.log(success);
    });

  }

  ngOnDestroy() {
    //  this.userSubscription$.unsubscribe();
  }




}

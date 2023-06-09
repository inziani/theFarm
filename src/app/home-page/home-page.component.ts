import { Component, OnDestroy, OnInit } from '@angular/core';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { UserInterface } from '../shared/interfaces/users-interface';
import { AgricultureDialogueComponent } from './home-page-dialogues/agriculture-dialogue/agriculture-dialogue.component';
import { HomePageModulesInterface } from '..//shared/interfaces/routers-interfaces';
import { FinanceDialogueComponent } from './home-page-dialogues/finance-dialogue/finance-dialogue.component';
import { HrDialogueComponent } from './home-page-dialogues/hr-dialogue/hr-dialogue.component';
import { KnowledgeDialogueComponent } from './home-page-dialogues/knowledge-dialogue/knowledge-dialogue.component';
import { ProjectsDialogueComponent } from './home-page-dialogues/projects-dialogue/projects-dialogue.component';
import { MaterialsDialogueComponent } from './home-page-dialogues/materials-dialogue/materials-dialogue.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  public users: UserInterface[] = [];
  public module!: HomePageModulesInterface;
  public homeModules: HomePageModulesInterface[] = [
    { id: 1, description: 'agriculture' },
    { id: 2, description: 'finances' },
    { id: 3, description: 'humanResource' },
    { id: 4, description: 'materialsMgt' },
    { id: 5, description: 'projectMgt' },
    { id: 6, description: 'knowledgeMgt' },
  ];

  constructor(private _dialog: MatDialog) {}

  ngOnInit(): void {}

  openAgricultureDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px';
    const dialogRef = this._dialog.open(
      AgricultureDialogueComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe((success) => {
      console.log(success);
    });
  }

  openFinanceDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px';
    const dialogRef = this._dialog.open(FinanceDialogueComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((success) => {
      console.log(success);
    });
  }

  openHumanResourcesDialogue() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px';
    const dialogRef = this._dialog.open(HrDialogueComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((success) => {
      console.log(success);
    });
  }

  openMaterialsDialogue() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px';
    const dialogRef = this._dialog.open(
      MaterialsDialogueComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe((success) => {
      console.log(success);
    });
  }

  openProjectsDialogue() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px';
    const dialogRef = this._dialog.open(
      ProjectsDialogueComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe((success) => {
      console.log(success);
    });
  }

  openKnowledgeDialogue() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px';
    const dialogRef = this._dialog.open(
      KnowledgeDialogueComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe((success) => {
      console.log(success);
    });
  }

  //   ngOnDestroy() {
  //     //  this.userSubscription$.unsubscribe();
  //   }
}

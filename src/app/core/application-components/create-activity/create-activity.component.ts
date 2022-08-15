import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { Activity } from '@app/core/shared/models/activity.model';
import { RestDataSource } from '@app/core/shared/data/rest.datasource';
import { Status } from '@app/core/shared/interfaces/activity-interface';
import { ActivityFormGroup } from '@app/core/shared/models/activityform-model';
import { ActivityCategoryInterface } from '@app/core/shared/interfaces/activity-interface';
import { EditActivityComponent } from '../edit-activity/edit-activity.component';

@Component({
  selector: 'app-create-activity',
  templateUrl: './create-activity.component.html',
  styleUrls: ['./create-activity.component.css']
})
export class CreateActivityComponent implements OnInit {

  public activity!: Activity;
  public isLoading = false;
  public formSubmitted: boolean = false;
  public title: string = 'Create Task';
  public activityCategory!: ActivityCategoryInterface[];
  public status: Status[] = [
    { value: 'Created', viewValue: 'Created' },
    { value: 'Work in progress', viewValue: 'Work in progress' },
    { value: 'Completed', viewValue: 'Completed' },
    { value: 'Closed', viewValue: 'Closed' }
  ];
  public formGroup = new ActivityFormGroup();
  public error!: string;

  constructor(
    private dataSource: RestDataSource,
    private dialogRef: MatDialogRef<CreateActivityComponent> ) { }

  ngOnInit(): void {

    this.dataSource.fetchActivityCategory().subscribe(category => {
      this.activityCategory = category;
    });
  }

   onAddActivity() {
    this.dialogRef.close(this.formGroup.value);
    this.activity = this.formGroup.value;
    this.dataSource.addActivity(this.activity.title, this.activity.description, this.activity.status, this.activity.activity_category).subscribe(success => {
      console.log(success)
      if (success) {
        alert('Activity added successfully');
        console.log(success);
      }
    },
      error => {
        this.error = 'The activity was not added.';
        alert(this.error);
        this.isLoading = false;
      }
    );

  };

  close() {

    this.dialogRef.close();

  }

}

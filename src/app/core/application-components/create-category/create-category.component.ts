
import { Component, OnInit, Inject, ViewChild } from '@angular/core';

import { ActivityCategoryFormGroup } from '@app/shared/models/activity-category-form.model';
import { Category } from '@app/shared/interfaces/activity-category';
import { RestDataSource } from '@app/shared/data/rest.datasource';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivityCategory } from '@app/shared/models/activity-category.models';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {


  formGroup = new ActivityCategoryFormGroup();
  isLoading = false;
  formSubmitted: boolean = false;
  activityCategory!: ActivityCategory;
  error!: string;
  title: string = 'Create task category';
  categorydata!: any;


  category: Category[] = [
    { value: 'Personal', viewValue: 'Personal' },
    { value: 'Official', viewValue: 'Official' }
  ];


  constructor(
    private dataSource: RestDataSource,
    private dialogRef: MatDialogRef<CreateCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogDataCategory: any
  ) { }

  ngOnInit(): void {
  }

  onAddActivityCategory() {
    this.dialogRef.close(this.formGroup.value);
    this.activityCategory = this.formGroup.value;
    this.dataSource.addActivityCategory(this.activityCategory.title, this.activityCategory.description, this.activityCategory.category).subscribe(success => {
      if (success) {
        // this.dialogue.open(LoginDialogComponent);
        // this.router.navigate(['home']);
        console.log(success);
      }
    },
      error => {
        this.error = 'Login Unsuccessful! Try again';
        alert(this.error);
        this.isLoading = false;
      }
    );
};


}

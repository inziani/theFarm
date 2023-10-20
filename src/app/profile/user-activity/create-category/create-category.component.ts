import { Component, OnInit, Inject } from '@angular/core';
import { ActivityCategoryFormGroup } from '@app/profile/user-activity/models/activity-category-form.model';
import { Category } from '@app/shared/interfaces/activity-interface';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ActivityCategory } from '@app/profile/user-activity/models/activity-category.models';
import { ObjectCreatedComponent } from '@app/shared/user-feedback-dialogues/object-created/object-created.component';
import { Store } from '@ngrx/store';
import { ActivityCategoryPageActions } from '@app/profile/store/actions/activity-category.actions';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css'],
})
export class CreateCategoryComponent implements OnInit {
  public formGroup = new ActivityCategoryFormGroup();
  public isLoading = false;
  public formSubmitted: boolean = false;
  public activityCategory!: ActivityCategory;
  public errorMessage!: string;
  public title: string = 'Create task category';
  public categorydata!: any;

  category: Category[] = [
    { value: 'Personal', viewValue: 'Personal' },
    { value: 'Official', viewValue: 'Official' },
  ];

  ngOnInit(): void {}

  public onAddActivityCategory() {
    this._dialogRef.close(this.formGroup.value);
    this.activityCategory = this.formGroup.value;
    this._store.dispatch(
      ActivityCategoryPageActions[
        '[ActivityCategoryPage]CreateActivityCategory'
      ]({
        activityCategory: this.activityCategory,
      })
    );
    this._dialog.open(ObjectCreatedComponent, {
      data: this.activityCategory.title,
    });
  }

  public close() {
    this._dialogRef.close();
  }

  constructor(
    private _dialog: MatDialog,
    private _dialogRef: MatDialogRef<CreateCategoryComponent>,
    private _store: Store,
    @Inject(MAT_DIALOG_DATA) public dialogDataCategory: any
  ) {}
}

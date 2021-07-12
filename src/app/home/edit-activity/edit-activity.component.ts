import { Component, ElementRef, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { ActivitysService } from 'src/app/core/services/activitys.service';
import { Activity } from 'src/app/shared/activity.model';

@Component({
  selector: 'app-edit-activity',
  templateUrl: './edit-activity.component.html',
  styleUrls: ['./edit-activity.component.css'],

})
export class EditActivityComponent implements OnInit {
  activity = {
    id: 0,
    title: '',
    description: ''
  }

  activityList: Activity[];


  constructor(
    private activitysService: ActivitysService ) {
    this.activityList =[];
  }

  ngOnInit(): void {
    this.activityList = this.activitysService.getActivitysList();

  }

  addActivity(newActivityForm: NgForm){
    this.activity.id = this.activityList.length+1
    this.activity.title = newActivityForm.value.newActivityData.title;
    this.activity.description = newActivityForm.value.newActivityData.description;
    const newActivity = new Activity(this.activity.id, this.activity.title, this.activity.description);
    this.activitysService.addActivityonList(newActivity);
    newActivityForm.reset();
  }

}

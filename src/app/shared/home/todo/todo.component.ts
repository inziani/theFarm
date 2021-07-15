import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';



import { ActivitysService } from 'src/app/core/services/activitys.service';
import { Activity } from 'src/app/shared/models/activity.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],

})
export class TodoComponent implements OnInit {

  activityList!: Activity[];
  todaysDate = new Date();

  private subscription!: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private activitysService: ActivitysService ){

    }

  ngOnInit(): void {
    this.activityList = this.activitysService.getActivitysList();
    this.subscription = this.activitysService.activityListChanged.subscribe(
      (activityList: Activity[])=>{
        this.activityList = activityList;
      }
    )
  }

  onNewActivity(){
    this.router.navigate(['newActivity'], { relativeTo: this.route});
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}

import { HttpClient } from '@angular/common/http';
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
  activityStatus = ['Created', 'WIP', 'Closed'];

  private subscription!: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private activitysService: ActivitysService,
    private http: HttpClient ){

    }

  ngOnInit(): void {
    this.fetchActivityData();
    this.activityList = this.activitysService.getActivitysList();
    this.subscription = this.activitysService.activityListChanged.subscribe(
      (activityList: Activity[])=>{
        this.activityList = activityList;
      }
    )
  }
  private fetchActivityData()
  // Fetch data and log it on the console
  {
    this.http.get
    ('http://127.0.0.1:8000/activitys/')
    .subscribe(responseData =>{
      console.log(responseData);
    });
  }

  onCreateActivity(sendActivityData: {
    id: number,
    slug: string,
    title: string,
    description: string,
    activity_category: string,
    status: string }){
    // Send http request with activitydata to Django API
    this.http.post('http://127.0.0.1:8000/activitys/', sendActivityData)
    .subscribe(responseData =>{
      console.log(responseData)
    });

  }

  onNewActivity(){
    this.router.navigate(['newActivity'], { relativeTo: this.route});
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}

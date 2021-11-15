import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { RestDataSource } from '@app/shared/data/rest.datasource';
import { Subscription } from 'rxjs';



import { ActivitysService } from 'src/app/core/services/activitys.service';
import { Activity } from 'src/app/shared/models/activity.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],

})
export class TodoComponent implements OnInit {

  activity!: Activity;
  activityObject = <Activity>{};
  activityList!: Activity[];
  todaysDate = new Date();
  activityStatus = ['Created', 'WIP', 'Closed'];
  randomQuote!: any;

  private subscription!: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private activitysService: ActivitysService,
    private http: HttpClient,
    private autheticationService: AuthenticationService,
    private dataSource: RestDataSource) {

  }

  ngOnInit(): void {
    // this.fetchActivityData();
    this.onFetchActivityData();
    this.onFetchRandomQuotes();
    this.activityList = this.activitysService.getActivitysList();
    this.subscription = this.activitysService.activityListChanged.subscribe(
      (activityList: Activity[]) => {
        this.activityList = activityList;
      }
    )
  }
  // private fetchActivityData()
  // // Fetch data and log it on the console
  // {
  //   this.activitysService.getRequest();
  // }

  onFetchRandomQuotes() {
    this.dataSource.fetchRandomQuotes().subscribe(
      quote => {
        console.log(quote);
        this.randomQuote = quote;

      });
  }

  onFetchActivityData() {
    this.activitysService.getActivityRequest().subscribe(
      data => {
        this.activityList = data;
      },
      error => {
        console.log(error);
      }
    )
  }
  editActivity(activity: Activity) {
    this.activitysService.getSingleActivityRequest(activity.id).subscribe(
      data => {
        console.log(data);
        this.activityObject = data;
        // this.activity.id = data.id;
        console.log(this.activityObject);
        console.log(this.activityObject.id);
        console.log(this.activityObject.title);
      },
      error => {
        console.log(error);
      }
    )
  };

  onNewActivity() {
    this.router.navigate(['newActivity'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

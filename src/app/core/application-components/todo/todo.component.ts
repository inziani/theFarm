import { HttpClient, HttpHeaders, HttpBackend } from '@angular/common/http';
import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { RestDataSource } from '@app/shared/data/rest.datasource';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';



import { ActivitysService } from 'src/app/core/services/activitys.service';
import { Activity } from 'src/app/shared/models/activity.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],

})
export class TodoComponent implements OnInit, AfterViewInit {

  activity!: Activity;
  activityObject = <Activity>{};
  activityList!: Activity[];
  todaysDate = new Date();
  activityColumnHeaders: string[] = ['id', 'title', 'description', 'date_created', 'date_changed', 'maintenance'];
  resultsLength = 0;
  // activityDatabase: ActivityHttpDatabase | null;
  isLoadingResults = true;
  isRateLimitReached = false;
  activityStatus = ['Created', 'WIP', 'Closed'];
  randomQuote!: any;

  private subscription!: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private activitysService: ActivitysService,
    private dataSource: RestDataSource) {

  }
  ngAfterViewInit() {
    // this.activityDatabase = new ActivityHttpDatabase(this.http);





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

  onFetchRandomQuotes() {
    this.dataSource.fetchRandomQuotes().subscribe(
      quote => {
        console.log(quote);
        this.randomQuote = quote;

      });
  }

  onFetchActivityData() {
    this.dataSource.fetchActivityList().subscribe(
      activityList => {
        this.activityList = activityList;
        console.log(this.activityList, 'testing');

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

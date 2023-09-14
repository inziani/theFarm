import { Component, OnInit } from '@angular/core';
import { ActivityState } from '../store/state/activity.state';
import { Store } from '@ngrx/store';
import { selectAllActivities } from '../store/selectors/activity.selectors';
import { Activity } from '../user-activity/models/activity.model';

@Component({
  selector: 'app-password-sec',
  templateUrl: './password-sec.component.html',
  styleUrls: ['./password-sec.component.css'],
})
export class PasswordSecComponent implements OnInit {
  public activities!: Activity[];
  public errorMessage!: string;

  ngOnInit(): void {
    this._store.select(selectAllActivities).subscribe({
      next: (activities) => {
        this.activities = activities;
        console.log('Activites Subscibed from the store - ', activities);
      },
      error: (err) => (this.errorMessage = err),
      complete: () => console.info('Complete'),
    });
  }


  constructor(
    private _store: Store<ActivityState>
  ) {}
}

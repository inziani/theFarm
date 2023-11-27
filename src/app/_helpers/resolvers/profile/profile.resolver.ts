import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { ActivitysService } from '@app/_helpers/services/activitys.service';
import { ActivityPageActions } from '@app/profile/store/actions/activity.actions';
import {
  selectActivitiesEntities,
  selectAllActivities,
} from '@app/profile/store/selectors/activity.selectors';
import { ActivityState } from '@app/profile/store/state/activity.state';
import { ActivityCategory } from '@app/profile/user-activity/models/activity-category.models';
import { Activity } from '@app/profile/user-activity/models/activity.model';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

export const profileResolver: ResolveFn<
  Observable<Activity[]>
> = (): Observable<Activity[]> => {
  const _store: Store<ActivityState> = inject(Store<ActivityState>);
  return _store.select(selectAllActivities);

};

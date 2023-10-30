import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { RestDataSource } from './shared/data/rest.datasource';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public errorMessage!: string;
  ngOnInit() {
    this._router.events.subscribe({
      next: (event) => {
        if (event instanceof NavigationStart) {
          console.log('Navigation Route -', event);
        }
      },
      error: (err) => (this.errorMessage = err),
      complete: () => console.info('Complete'),
    });
  }

  constructor(private readonly _router: Router) {}
}

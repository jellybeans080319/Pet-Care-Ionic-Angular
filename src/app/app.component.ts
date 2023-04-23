import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseAuthService } from './firebase-auth.service';
import { DataService } from './services/data.service';

import { DayService, WeekService, WorkWeekService, MonthService, AgendaService, View } from '@syncfusion/ej2-angular-schedule';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public selectedDate: Date = new Date(2018, 1, 15);
  public currentView: View = 'Month';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: FirebaseAuthService,
    private dataService: DataService
  ) {
}

  async logout() {
    await this.dataService.logout();
    sessionStorage.removeItem('user_id')
    this.router.navigateByUrl('/', { replaceUrl: true });
  }
}

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseAuthService } from './firebase-auth.service';
import { DataService } from './services/data.service';

import { DayService, WeekService, WorkWeekService, MonthService, AgendaService, View } from '@syncfusion/ej2-angular-schedule';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],

  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService],
  // specifies the template string for the Schedule component
  template: `<ejs-schedule width='100%' height='550px' [selectedDate]="selectedDate" [eventSettings]="eventSettings"><e-views> <e-view option="Week" startHour="07:00" endHour="15:00"></e-view>
  <e-view option="WorkWeek" startHour="10:00" endHour="18:00"></e-view> <e-view option="Month" [showWeekend]="showWeekend"></e-view></e-views></ejs-schedule>`
})
export class AppComponent {
  public selectedDate: Date = new Date(2018, 1, 15);
  public currentView: View = 'Month';
  // user: any = []
  // name: any = ""
  // uid: any = sessionStorage.getItem('user_id')

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: FirebaseAuthService,
    private dataService: DataService
  ) {
  //   this.dataService.getUserInfo().subscribe(res => {
  //     this.user = res
  //     this.name = this.user[0].name
  // })
}

  async logout() {
    await this.dataService.logout();
    sessionStorage.removeItem('user_id')
    this.router.navigateByUrl('/', { replaceUrl: true });
  }
}

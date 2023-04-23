import { Component } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  uid: any
  user: any = []
  name: any = ""

  constructor(
    private dataService: DataService
  ) {
    console.log(sessionStorage.getItem('user_id'))
    this.uid = sessionStorage.getItem('user_id')
    this.dataService.getUserInfo(this.uid).subscribe(res => {
      this.user = res //this means ipapakita lahat ng laman nung database
      this.name = this.user[0].name
    })
  }
}

import { Component, AfterViewInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-cal-modal',
  templateUrl: './cal-modal.page.html',
  styleUrls: ['./cal-modal.page.scss'],
})
export class CalModalPage implements AfterViewInit {
  calendar: any = {
    mode: 'month',
    currentDate: new Date()
  };
  viewTitle!: string;

  event = {
    title: '',
    desc: '',
    startTime: '', //null
    endTime: '',
    allDay: true
  };

  modalReady = false;

  constructor(private modalCtrl: ModalController) { }

  ngAfterViewInit() {
    setTimeout(() => {
      this.modalReady = true;
    }, 0);
  }

  save() {
    this.modalCtrl.dismiss({event: this.event})
  }

  onViewTitleChanged(title: any) {
    this.viewTitle = title;
  }

  onTimeSelected(ev: any) {
    this.event.startTime = new Date(ev.selectedTime).toString();
  }

  close() {
    this.modalCtrl.dismiss();
  }
}

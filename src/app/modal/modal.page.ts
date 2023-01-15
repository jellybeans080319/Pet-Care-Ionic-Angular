import { Component, Input ,OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { DataService, Note } from '../services/data.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  @Input() id: any;
  note: any = null;

  constructor(
    private dataService: DataService, 
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController) { }

  ngOnInit() {
    this.dataService.getNoteById(this.id).subscribe(res => {
      this.note = res
    })
  }

  async updateNote(){
    this.dataService.updateNote(this.note); 
    const toast = await this.toastCtrl.create({
      message: 'Successfully updated!',
      duration: 1000
    });
    toast.present();
    this.modalCtrl.dismiss();
  }
  
  async deleteNote(){
    const alert = await this.alertCtrl.create({
      header: 'Delete Note',
      message: 'Are you sure you want to delete?',
      buttons: [
        {
          text: 'No',
          role: 'cancel'
        },
        {
          text: 'Yes',
          handler: () =>{
            this.dataService.deleteNote(this.note),
            this.modalCtrl.dismiss()
          }
        }
      ]
    });
    await alert.present();
    
  }
}

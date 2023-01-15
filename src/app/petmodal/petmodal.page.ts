import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { DataService, Pet } from '../services2/data.service';

@Component({
  selector: 'app-petmodal',
  templateUrl: './petmodal.page.html',
  styleUrls: ['./petmodal.page.scss'],
})
export class PetmodalPage implements OnInit {
  @Input() id: any;
  pet: any = null;

  constructor(
    private dataService: DataService, 
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController) { }

  ngOnInit() {
    this.dataService.getNoteById(this.id).subscribe(res => {
      this.pet = res
    })
  }

  async updateNote(){
    this.dataService.updateNote(this.pet); 
    const toast = await this.toastCtrl.create({
      message: 'Successfully updated!',
      duration: 1000
    });
    toast.present();
    this.modalCtrl.dismiss();
  }
  
  async deleteNote(){
    const alert = await this.alertCtrl.create({
      header: 'Delete Pet',
      message: 'Are you sure you want to delete?',
      buttons: [
        {
          text: 'No',
          role: 'cancel'
        },
        {
          text: 'Yes',
          handler: () =>{
            this.dataService.deleteNote(this.pet),
            this.modalCtrl.dismiss()
          }
        }
      ]
    });
    await alert.present();
    
  }
}

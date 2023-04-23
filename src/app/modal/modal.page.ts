import { Component, Input ,OnInit } from '@angular/core';
import { AlertController, ModalController, LoadingController, ToastController } from '@ionic/angular';
import { DataService, Note } from '../services/data.service';
import { AvatarService } from '../services/avatar.service';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  @Input() id: any;
  note: any = null;

  profile: any = [];
  constructor(
    private dataService: DataService, 
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private loadingController: AlertController,
    private avatarService: AvatarService) {

      this.avatarService.getUserProfile().subscribe((data: any) => {
        this.profile = data;
      });
     }

     async changeImage() {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera, // Camera, Photos or Prompt!
      });
  
      if (image) {
        const loading = await this.loadingController.create();
        await loading.present();
  
        const result = await this.avatarService.uploadImage(image);
        loading.dismiss();
  
        if (!result) {
          const alert = await this.alertCtrl.create({
            header: 'Upload failed',
            message: 'There was a problem uploading your avatar.',
            buttons: ['OK'],
          });
          await alert.present();
        }
      }
    }

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

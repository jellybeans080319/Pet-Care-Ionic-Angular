import { Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { DataService } from '../services/data.service';
import { ModalPage } from '../modal/modal.page';

@Component({
  selector: 'app-note',
  templateUrl: './note.page.html',
  styleUrls: ['./note.page.scss'],
})
export class NotePage {
  uid: any = sessionStorage.getItem('user_id')
  notes: any =[];
  users: any =[];
  constructor(
    private dataService: DataService,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController
    ) {
    this.dataService.getNotes().subscribe(res =>{
      //console.log(res);
      this.notes=res;
    });
    this.dataService.getUserInfo(this.uid).subscribe(res =>{
      //console.log(res);
      this.users=res;
    });
  }

  async openNote(note:any){
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      componentProps: {id: note.id,},
      breakpoints: [0, 0.5, 0.8], //tapno ngumato ajay modal
      initialBreakpoint: 0.5 //deretso ngaton ajay modalen automatiken
    });
    await modal.present();
  }
  async openUser(user: any){
    const modal=await this.modalCtrl.create({
      component: ModalPage, componentProps:{
        id: user.uid
      }
    })
  }
  async addNote(){
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Add Note',
      inputs: [
        {
          name: 'title',
          placeholder: 'Enter note title',
          type: 'text'
        },
        {
          name: 'text',
          placeholder: 'Enter note text',
          type: 'textarea'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler: (res) =>{
            this.dataService.addNote({title: res.title, text: res.text})
            //this.dataService.addNoteWithCustomId({title: res.title, text: res.text})
          }
        }
      ]
    });
    await alert.present();

  }

}
